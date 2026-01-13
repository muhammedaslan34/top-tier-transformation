import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    await prisma.$connect();
    
    // Check if adminUser model exists
    if (!prisma.adminUser) {
      return NextResponse.json(
        {
          success: false,
          error: "AdminUser model not found in Prisma client. Please run 'npx prisma generate'",
          availableModels: Object.keys(prisma).filter(k => !k.startsWith('$') && !k.startsWith('_')),
        },
        { status: 500 }
      );
    }
    
    // Test if admin_users table exists
    const adminCount = await prisma.adminUser.count();
    
    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      adminUsersCount: adminCount,
      databaseUrl: process.env.DATABASE_URL ? "Set" : "Not set",
      availableModels: Object.keys(prisma).filter(k => !k.startsWith('$') && !k.startsWith('_')),
    });
  } catch (error: any) {
    console.error("Database test error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Database connection failed",
        code: error.code,
        details: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
