interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
}

export async function verifyTurnstileToken(token: string, remoteip?: string): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY is not configured");
    // In development without key, skip verification
    if (process.env.NODE_ENV === "development") {
      console.warn("Skipping Turnstile verification in development (no secret key)");
      return { success: true };
    }
    return { success: false, error: "CAPTCHA service not configured" };
  }

  if (!token) {
    return { success: false, error: "No CAPTCHA token provided" };
  }

  try {
    const params = new URLSearchParams({
      secret: secretKey,
      response: token,
    });

    // Add remote IP if provided (recommended by Cloudflare)
    if (remoteip) {
      params.append("remoteip", remoteip);
    }

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      }
    );

    if (!response.ok) {
      console.error("Turnstile API error:", response.status, response.statusText);
      return { success: false, error: "CAPTCHA service unavailable" };
    }

    const data: TurnstileVerifyResponse = await response.json();

    if (!data.success) {
      const errorCodes = data["error-codes"] || [];
      console.error("Turnstile verification failed:", {
        errorCodes,
        hostname: data.hostname,
        challenge_ts: data.challenge_ts,
      });
      
      // Provide more specific error messages
      let errorMessage = "CAPTCHA verification failed";
      if (errorCodes.includes("invalid-input-response")) {
        errorMessage = "Invalid CAPTCHA token. Please try again.";
      } else if (errorCodes.includes("timeout-or-duplicate")) {
        errorMessage = "CAPTCHA token expired. Please complete the CAPTCHA again.";
      } else if (errorCodes.includes("invalid-input-secret")) {
        errorMessage = "CAPTCHA configuration error. Please contact support.";
      }
      
      return { success: false, error: errorMessage };
    }

    return { success: true };
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return { success: false, error: "CAPTCHA verification service error" };
  }
}
