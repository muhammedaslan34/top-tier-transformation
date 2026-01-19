import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 requests per hour per IP
    const clientIp = getClientIp(request);
    const rateLimitResult = checkRateLimit(`contact:${clientIp}`, {
      windowMs: 60 * 60 * 1000, // 1 hour
      maxRequests: 5,
    });

    if (!rateLimitResult.success) {
      const retryAfter = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000);
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfter),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(rateLimitResult.resetTime),
          },
        }
      );
    }

    // Check if Resend API key is configured
    if (!resend || !process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured. Please add RESEND_API_KEY to your .env.local file.");
      return NextResponse.json(
        { 
          error: "Email service is not configured. Please add RESEND_API_KEY to your environment variables.",
          details: "Missing RESEND_API_KEY environment variable"
        },
        { status: 500 }
      );
    }

    let body;
    try {
      body = await request.json();
      console.log("Received contact form data:", { 
        name: body.name, 
        email: body.email, 
        phone: body.phone,
        serviceInterest: body.serviceInterest 
      });
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return NextResponse.json(
        { error: "Invalid request body", details: "Request body must be valid JSON" },
        { status: 400 }
      );
    }
    const { name, companyName, email, phone, serviceInterest, message, turnstileToken } = body;

    // Validate required fields
    if (!name || !email || !phone || !serviceInterest || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Verify Turnstile CAPTCHA token (only if secret key is configured and token is provided)
    // If TURNSTILE_SECRET_KEY is set but no token is provided, skip verification
    // (this allows the form to work if CAPTCHA is not displayed on frontend)
    if (process.env.TURNSTILE_SECRET_KEY && turnstileToken) {
      const isTurnstileValid = await verifyTurnstileToken(turnstileToken);
      if (!isTurnstileValid) {
        return NextResponse.json(
          { error: "CAPTCHA verification failed. Please try again." },
          { status: 400 }
        );
      }
    }

    // Get service name from translation key (we'll use the key for now, can be improved)
    const serviceNames: Record<string, string> = {
      digitalTransformation: "Digital Transformation",
      dataGovernance: "Data Governance",
      cloudComputing: "Cloud Computing",
      beneficiaryExperience: "Beneficiary Experience",
      innovationServices: "Innovation Services",
      governanceRiskCompliance: "Governance, Risk & Compliance",
    };

    const serviceName = serviceNames[serviceInterest] || serviceInterest;

    // Save submission to database (do this before email to ensure it's saved)
    let submissionId: string | null = null;
    try {
      const submission = await prisma.contactSubmission.create({
        data: {
          name,
          companyName: companyName || null,
          email,
          phone,
          serviceInterest,
          message,
          isRead: false,
          status: "new",
        },
      });
      submissionId = submission.id;
      console.log("Submission saved to database:", submissionId);
    } catch (dbError) {
      console.error("Failed to save submission to database:", dbError);
      // Continue with email even if DB save fails
    }

    // Helper function to escape HTML to prevent XSS
    const escapeHtml = (text: string): string => {
      const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      return text.replace(/[&<>"']/g, (m) => map[m]);
    };

    // Escape user input to prevent XSS
    const safeName = escapeHtml(name);
    const safeCompanyName = companyName ? escapeHtml(companyName) : '';
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeServiceName = escapeHtml(serviceName);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    // Create email HTML template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1F6BFF 0%, #00A3FF 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <h2 style="color: #1F6BFF; margin-top: 0; font-size: 20px;">Contact Information</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 10px; background: white; border-bottom: 1px solid #e0e0e0; font-weight: bold; width: 150px;">Name:</td>
                <td style="padding: 10px; background: white; border-bottom: 1px solid #e0e0e0;">${safeName}</td>
              </tr>
              ${safeCompanyName ? `
              <tr>
                <td style="padding: 10px; background: white; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Company:</td>
                <td style="padding: 10px; background: white; border-bottom: 1px solid #e0e0e0;">${safeCompanyName}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px; background: white; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Email:</td>
                <td style="padding: 10px; background: white; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${safeEmail}" style="color: #1F6BFF; text-decoration: none;">${safeEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; background: white; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Phone:</td>
                <td style="padding: 10px; background: white; border-bottom: 1px solid #e0e0e0;"><a href="tel:${safePhone}" style="color: #1F6BFF; text-decoration: none;">${safePhone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; background: white; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Service Interest:</td>
                <td style="padding: 10px; background: white; border-bottom: 1px solid #e0e0e0;">${safeServiceName}</td>
              </tr>
            </table>
            
            <h2 style="color: #1F6BFF; margin-top: 30px; font-size: 20px;">Message</h2>
            <div style="background: white; padding: 20px; border-radius: 5px; border: 1px solid #e0e0e0; white-space: pre-wrap; line-height: 1.8;">
              ${safeMessage}
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e0e0e0; color: #666; font-size: 12px;">
              <p style="margin: 0;">This email was sent from the Top Tier Tech contact form.</p>
              <p style="margin: 5px 0 0 0;">Submitted on: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend
    try {
      const emailPayload: any = {
        from: "Top Tier Tech Contact Form <sales@tttech.com.sa>", // You'll need to verify your domain with Resend to use sales@tttech.com.sa
        to: ["sales@tttech.com.sa"], // Send to sales email
        subject: `New Contact Form Submission - ${serviceName}`,
        html: emailHtml,
      };

      // Add replyTo only if email is valid
      if (email && emailRegex.test(email)) {
        emailPayload.replyTo = email;
      }

      const { data, error } = await resend.emails.send(emailPayload);

      if (error) {
        console.error("Resend error details:", {
          name: error.name,
          message: error.message,
          statusCode: (error as any).statusCode,
          fullError: JSON.stringify(error, null, 2)
        });
        
        // Return more detailed error message
        const errorMessage = error.message || "Failed to send email";
        const errorDetails = error.name || "Unknown error";
        
        // Check if it's a domain verification error
        const isDomainError = errorMessage.includes("verify a domain") || errorMessage.includes("testing emails");
        
        return NextResponse.json(
          { 
            error: errorMessage,
            details: errorDetails,
            isDomainError,
            fullError: process.env.NODE_ENV === "development" ? JSON.stringify(error, null, 2) : undefined
          },
          { status: 500 }
        );
      }

      console.log("Email sent successfully:", { messageId: data?.id });
      return NextResponse.json(
        { success: true, messageId: data?.id, submissionId },
        { 
          status: 200,
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
    } catch (resendError) {
      console.error("Resend send error:", resendError);
      const errorMessage = resendError instanceof Error ? resendError.message : "Failed to send email";
      const errorStack = resendError instanceof Error ? resendError.stack : "Unknown error";
      
      // Return success if submission was saved, even if email failed
      if (submissionId) {
        return NextResponse.json(
          { 
            success: true,
            warning: "Submission saved but email failed to send",
            submissionId,
            emailError: errorMessage
          },
          { 
            status: 200,
            headers: {
              "Content-Type": "application/json",
            }
          }
        );
      }
      
      return NextResponse.json(
        {
          error: errorMessage,
          ...(process.env.NODE_ENV === "development" && { details: errorStack }),
        },
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
    }

  } catch (error) {
    console.error("Contact form error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    const errorStack = error instanceof Error ? error.stack : undefined;

    return NextResponse.json(
      {
        error: errorMessage,
        ...(process.env.NODE_ENV === "development" && { details: errorStack }),
      },
      { 
        status: 500,
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
  }
}
