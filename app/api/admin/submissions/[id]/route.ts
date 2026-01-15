import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../middleware";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const authError = await requireAuth(request);
    if (authError) return authError;

    const submission = await prisma.contactSubmission.findUnique({
      where: { id: params.id },
    });

    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(submission);
  } catch (error) {
    console.error("Error fetching submission:", error);
    return NextResponse.json(
      { error: "Failed to fetch submission" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const authError = await requireAuth(request);
    if (authError) return authError;

    const body = await request.json();
    const { isRead, status } = body;

    const updateData: any = {};
    if (isRead !== undefined) {
      updateData.isRead = isRead;
    }
    if (status !== undefined) {
      updateData.status = status;
    }

    const submission = await prisma.contactSubmission.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.error("Error updating submission:", error);
    return NextResponse.json(
      { error: "Failed to update submission" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const authError = await requireAuth(request);
    if (authError) return authError;

    await prisma.contactSubmission.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting submission:", error);
    return NextResponse.json(
      { error: "Failed to delete submission" },
      { status: 500 }
    );
  }
}
