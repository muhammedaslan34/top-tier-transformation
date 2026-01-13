import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../middleware";
import { prisma } from "@/lib/prisma";
import Papa from "papaparse";

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authError = await requireAuth(request);
    if (authError) return authError;

    // Get all submissions (or filtered if needed)
    const searchParams = request.nextUrl.searchParams;
    const serviceInterest = searchParams.get("serviceInterest");
    const status = searchParams.get("status");
    const isRead = searchParams.get("isRead");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const where: any = {};

    if (serviceInterest) {
      where.serviceInterest = serviceInterest;
    }

    if (status) {
      where.status = status;
    }

    if (isRead !== null && isRead !== undefined && isRead !== "") {
      where.isRead = isRead === "true";
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate);
      }
    }

    const submissions = await prisma.contactSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // Convert to CSV format
    const csvData = submissions.map((submission) => ({
      ID: submission.id,
      Name: submission.name,
      "Company Name": submission.companyName || "",
      Email: submission.email,
      Phone: submission.phone,
      "Service Interest": submission.serviceInterest,
      Message: submission.message,
      "Is Read": submission.isRead ? "Yes" : "No",
      Status: submission.status,
      "Created At": submission.createdAt.toISOString(),
      "Updated At": submission.updatedAt.toISOString(),
    }));

    const csv = Papa.unparse(csvData);

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="submissions-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Error exporting submissions:", error);
    return NextResponse.json(
      { error: "Failed to export submissions" },
      { status: 500 }
    );
  }
}
