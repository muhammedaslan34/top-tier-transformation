-- CreateTable
CREATE TABLE "replies" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "adminUserId" TEXT,
    "message" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "replies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "replies_submissionId_idx" ON "replies"("submissionId");

-- CreateIndex
CREATE INDEX "replies_adminUserId_idx" ON "replies"("adminUserId");

-- CreateIndex
CREATE INDEX "replies_sentAt_idx" ON "replies"("sentAt");

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "contact_submissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "admin_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
