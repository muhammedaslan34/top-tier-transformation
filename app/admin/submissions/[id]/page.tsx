import { redirect } from "next/navigation";
import { SubmissionDetail } from "@/components/admin/SubmissionDetail";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SubmissionDetailPage({ params }: PageProps) {
  const { id } = await params;
  const submission = await prisma.contactSubmission.findUnique({
    where: { id },
  });

  if (!submission) {
    redirect("/admin");
  }

  return (
    <SubmissionDetail
      submission={{
        ...submission,
        createdAt: submission.createdAt.toISOString(),
        updatedAt: submission.updatedAt.toISOString(),
      }}
    />
  );
}
