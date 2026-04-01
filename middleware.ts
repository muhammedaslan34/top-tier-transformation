import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isDev = process.env.NODE_ENV === "development";

// ---------------------------------------------------------------------------
// Builds the Content-Security-Policy header value for a given nonce.
//
// Key decisions:
//   - 'nonce-{nonce}': only scripts carrying this per-request token execute.
//     CSP Level 2+ browsers enforce this strictly.
//   - 'strict-dynamic': propagates trust from a nonce-d script to any scripts
//     it loads dynamically (required for Next.js chunk loading).
//   - 'unsafe-inline': silently ignored by browsers that understand nonces;
//     kept as a fallback for ancient CSP Level-1-only browsers.
//   - 'unsafe-eval': dev only — React/Turbopack needs it for HMR and source
//     map reconstruction. Absent in production.
//   - Cloudflare Turnstile domains: kept as explicit URL allowlist so the
//     widget works in browsers that don't honour 'strict-dynamic'.
//   - Resend is server-side only (API route → Resend), so it needs no entry.
// ---------------------------------------------------------------------------
function buildCsp(nonce: string): string {
  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    "'unsafe-inline'",
    ...(isDev ? ["'unsafe-eval'"] : []),
    "https://challenges.cloudflare.com",
  ].join(" ");

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://challenges.cloudflare.com",
    "frame-src https://challenges.cloudflare.com",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Nonce + CSP ────────────────────────────────────────────────────────────
  // A fresh cryptographic nonce is minted for every HTML response.
  // • Forwarded as x-nonce so the layout (and Next.js itself) can stamp it
  //   onto any inline <script> tags they emit.
  // • Set as Content-Security-Policy on the response so the browser enforces
  //   it. Because this runs in middleware, it takes precedence over the static
  //   headers in next.config.js (CSP has been removed from there).
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = buildCsp(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  // ── Admin auth ─────────────────────────────────────────────────────────────
  if (
    pathname !== "/admin/login" &&
    pathname !== "/admin/setup" &&
    pathname.startsWith("/admin")
  ) {
    const sessionCookie = request.cookies.get("admin_session");

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const sessionData = JSON.parse(
        Buffer.from(sessionCookie.value, "base64").toString()
      );
      if (!sessionData.authenticated || Date.now() > sessionData.expiresAt) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Pass the modified request headers downstream (so Next.js reads x-nonce)
  // and attach the CSP to the outgoing response.
  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set("content-security-policy", csp);
  return response;
}

export const config = {
  matcher: [
    {
      // Run on every URL that produces an HTML response.
      // Excludes Next.js internals and static assets (no nonce needed there).
      // The `missing` condition skips prefetch requests — they never render
      // HTML, so generating a throwaway nonce for them is wasteful.
      source: "/((?!_next/static|_next/image|favicon\\.ico|icon\\.png).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
