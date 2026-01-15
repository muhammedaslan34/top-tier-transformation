import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    // Test database connection first
    await prisma.$connect();
    
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if any admin users exist
    let adminCount;
    try {
      adminCount = await prisma.adminUser.count();
    } catch (countError: any) {
      console.error("Error counting admin users:", countError);
      return NextResponse.json(
        { 
          error: "Database error: Could not check existing admin users",
          details: process.env.NODE_ENV === "development" ? countError.message : undefined,
        },
        { status: 500 }
      );
    }

    if (adminCount > 0) {
      return NextResponse.json(
        { error: "Admin users already exist. Use the login page instead." },
        { status: 400 }
      );
    }

    // Create first admin user
    const hashedPassword = await hash(password, 10);

    const admin = await prisma.adminUser.create({
      data: {
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        name: name || "Admin User",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
      email: admin.email,
    });
  } catch (error: any) {
    console.error("Setup error:", error);
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack,
    });
    
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Return more detailed error in development
    const errorMessage = process.env.NODE_ENV === "development" 
      ? error.message || "Failed to create admin user"
      : "Failed to create admin user";

    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? {
          code: error.code,
          meta: error.meta,
        } : undefined,
      },
      { status: 500 }
    );
  }
}
