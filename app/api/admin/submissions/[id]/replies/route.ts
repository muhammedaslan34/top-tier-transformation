import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../../middleware";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Check authentication
    const authError = await requireAuth(request);
    if (authError) return authError;

    const replies = await prisma.reply.findMany({
      where: { submissionId: id },
      include: {
        adminUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { sentAt: "asc" },
    });

    return NextResponse.json(replies);
  } catch (error) {
    console.error("Error fetching replies:", error);
    return NextResponse.json(
      { error: "Failed to fetch replies" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Check authentication
    const authError = await requireAuth(request);
    if (authError) return authError;

    // Get current admin user ID from session
    const sessionToken = request.cookies.get("admin_session")?.value;
    if (!sessionToken) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const isValid = await verifySession(sessionToken);
    if (!isValid) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Extract admin user ID from session
    let adminUserId: string | null = null;
    try {
      const sessionData = JSON.parse(
        Buffer.from(sessionToken, "base64").toString()
      );
      adminUserId = sessionData.adminUserId || null;
      
      console.log("Session data:", { 
        authenticated: sessionData.authenticated,
        adminUserId: sessionData.adminUserId,
        hasAdminUserId: !!sessionData.adminUserId,
        expiresAt: sessionData.expiresAt 
      });
    } catch (parseError) {
      console.error("Failed to parse session:", parseError);
      return NextResponse.json(
        { error: "Invalid session", details: process.env.NODE_ENV === "development" ? String(parseError) : undefined },
        { status: 401 }
      );
    }

    if (!adminUserId) {
      console.error("Admin user ID not found in session");
      return NextResponse.json(
        { error: "Admin user ID not found in session" },
        { status: 401 }
      );
    }

    // Verify admin user exists and get admin user info
    let adminUser = await prisma.adminUser.findUnique({
      where: { id: adminUserId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    // If admin user not found, log warning but allow reply (adminUserId is optional in schema)
    if (!adminUser) {
      console.warn("Admin user not found in database:", adminUserId);
      console.warn("Creating reply without admin user association");
      adminUser = null;
    }

    // Get request body
    const body = await request.json();
    const { message } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Verify submission exists
    const submission = await prisma.contactSubmission.findUnique({
      where: { id: id },
    });

    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    // Admin user info already retrieved above

    // Save reply to database (adminUserId is optional - null if admin user not found)
    const reply = await prisma.reply.create({
      data: {
        submissionId: id,
        adminUserId: adminUser ? adminUserId : null,
        message: message.trim(),
        sentAt: new Date(),
      },
      include: {
        adminUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Send email to original submitter
    if (resend && process.env.RESEND_API_KEY) {
      try {
        // Helper function to escape HTML
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

        const safeName = escapeHtml(submission.name);
        const safeCompanyName = submission.companyName ? escapeHtml(submission.companyName) : '';
        const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br>');
        const adminName = adminUser?.name || adminUser?.email || "Admin";
        const safeAdminName = escapeHtml(adminName);
        const replyToEmail = adminUser?.email || "sales@tttech.com.sa";

        // Get service name
        const serviceNames: Record<string, string> = {
          digitalTransformation: "Digital Transformation",
          dataGovernance: "Data Governance",
          cloudComputing: "Cloud Computing",
          beneficiaryExperience: "Beneficiary Experience",
          innovationServices: "Innovation Services",
          governanceRiskCompliance: "Governance, Risk & Compliance",
        };
        const serviceName = serviceNames[submission.serviceInterest] || submission.serviceInterest;
        const safeServiceName = escapeHtml(serviceName);

        // Create email HTML template
        const emailHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Reply to Your Inquiry</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #1F6BFF 0%, #00A3FF 100%); padding: 30px; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 24px;">Reply to Your Inquiry</h1>
              </div>
              
              <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
                <p style="margin-top: 0; font-size: 16px;">Dear ${safeName},</p>
                
                <p>Thank you for contacting Top Tier Tech regarding <strong>${safeServiceName}</strong>. We have received your inquiry and are pleased to respond.</p>
                
                <div style="background: white; padding: 20px; border-radius: 5px; border-left: 4px solid #1F6BFF; margin: 20px 0;">
                  <h3 style="color: #1F6BFF; margin-top: 0;">Our Response:</h3>
                  <div style="white-space: pre-wrap; line-height: 1.8;">
                    ${safeMessage}
                  </div>
                </div>

                <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <h3 style="margin-top: 0; font-size: 14px; color: #666;">Your Original Inquiry:</h3>
                  <p style="font-size: 13px; color: #666; margin: 5px 0;">
                    <strong>Service:</strong> ${safeServiceName}
                  </p>
                  ${safeCompanyName ? `<p style="font-size: 13px; color: #666; margin: 5px 0;"><strong>Company:</strong> ${safeCompanyName}</p>` : ''}
                  <p style="font-size: 13px; color: #666; margin: 5px 0;">
                    <strong>Submitted:</strong> ${new Date(submission.createdAt).toLocaleString()}
                  </p>
                </div>
                
                <p>If you have any further questions or need additional assistance, please don't hesitate to reply to this email.</p>
                
                <p style="margin-bottom: 0;">Best regards,<br>
                <strong>${safeAdminName}</strong><br>
                Top Tier Tech</p>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e0e0e0; color: #666; font-size: 12px;">
                  <p style="margin: 0;">This email was sent in response to your contact form submission.</p>
                  <p style="margin: 5px 0 0 0;">Reply sent on: ${new Date().toLocaleString()}</p>
                </div>
              </div>
            </body>
          </html>
        `;

        const emailPayload: any = {
          from: "Top Tier Tech <sales@tttech.com.sa>",
          to: [submission.email],
          subject: `Re: Your Inquiry About ${serviceName}`,
          html: emailHtml,
          replyTo: replyToEmail,
        };

        const { error: emailError } = await resend.emails.send(emailPayload);

        if (emailError) {
          console.error("Failed to send reply email:", emailError);
          // Still return success since reply was saved
          return NextResponse.json({
            success: true,
            reply,
            warning: "Reply saved but email failed to send",
            emailError: emailError.message,
          });
        }

        return NextResponse.json({
          success: true,
          reply,
        });
      } catch (emailError) {
        console.error("Error sending reply email:", emailError);
        // Still return success since reply was saved
        return NextResponse.json({
          success: true,
          reply,
          warning: "Reply saved but email failed to send",
        });
      }
    } else {
      // No email service configured, but reply is saved
      console.warn("RESEND_API_KEY not configured. Reply saved but email not sent.");
      return NextResponse.json({
        success: true,
        reply,
        warning: "Reply saved but email service not configured",
      });
    }
  } catch (error: any) {
    console.error("Error creating reply:", error);
    console.error("Error stack:", error.stack);
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      meta: error.meta,
    });
    return NextResponse.json(
      { 
        error: "Failed to create reply",
        message: error.message || "Unknown error",
        details: process.env.NODE_ENV === "development" ? {
          message: error.message,
          code: error.code,
          stack: error.stack,
        } : undefined
      },
      { status: 500 }
    );
  }
}
