"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";

interface Submission {
  id: string;
  name: string;
  email: string;
  serviceInterest: string;
  createdAt: string;
  isRead: boolean;
  status: string;
}

interface SubmissionsTableProps {
  submissions: Submission[];
  onDelete: (id: string) => void;
}

export function SubmissionsTable({ submissions, onDelete }: SubmissionsTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) {
      return;
    }

    setDeletingId(id);
    try {
      await fetch(`/api/admin/submissions/${id}`, {
        method: "DELETE",
      });
      onDelete(id);
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete submission");
    } finally {
      setDeletingId(null);
    }
  };

  const serviceNames: Record<string, string> = {
    digitalTransformation: "Digital Transformation",
    dataGovernance: "Data Governance",
    cloudComputing: "Cloud Computing",
    beneficiaryExperience: "Beneficiary Experience",
    innovationServices: "Innovation Services",
    governanceRiskCompliance: "Governance, Risk & Compliance",
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                No submissions found
              </TableCell>
            </TableRow>
          ) : (
            submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="font-medium">{submission.name}</TableCell>
                <TableCell>{submission.email}</TableCell>
                <TableCell>
                  {serviceNames[submission.serviceInterest] || submission.serviceInterest}
                </TableCell>
                <TableCell>
                  {format(new Date(submission.createdAt), "MMM d, yyyy HH:mm")}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Badge variant={submission.isRead ? "secondary" : "default"}>
                      {submission.isRead ? "Read" : "New"}
                    </Badge>
                    <Badge variant="outline">{submission.status}</Badge>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/submissions/${submission.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(submission.id)}
                      disabled={deletingId === submission.id}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
