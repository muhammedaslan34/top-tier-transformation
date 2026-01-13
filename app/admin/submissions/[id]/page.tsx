import { redirect } from "next/navigation";
import { SubmissionDetail } from "@/components/admin/SubmissionDetail";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: { id: string };
}

export default async function SubmissionDetailPage({ params }: PageProps) {
  const submission = await prisma.contactSubmission.findUnique({
    where: { id: params.id },
  });

  if (!submission) {
    redirect("/admin");
  }

  return <SubmissionDetail submission={submission} />;
}
