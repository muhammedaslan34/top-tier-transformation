"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, Building2, Calendar, CheckCircle2, XCircle } from "lucide-react";
import { ReplyForm } from "./ReplyForm";
import { ReplyHistory } from "./ReplyHistory";

interface Submission {
  id: string;
  name: string;
  companyName: string | null;
  email: string;
  phone: string;
  serviceInterest: string;
  message: string;
  isRead: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Reply {
  id: string;
  message: string;
  sentAt: string;
  adminUser: {
    id: string;
    name: string | null;
    email: string;
  } | null;
}

interface SubmissionDetailProps {
  submission: Submission;
}

export function SubmissionDetail({ submission }: SubmissionDetailProps) {
  const router = useRouter();
  const [isRead, setIsRead] = useState(submission.isRead);
  const [loading, setLoading] = useState(false);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loadingReplies, setLoadingReplies] = useState(true);

  const serviceNames: Record<string, string> = {
    digitalTransformation: "Digital Transformation",
    dataGovernance: "Data Governance",
    cloudComputing: "Cloud Computing",
    beneficiaryExperience: "Beneficiary Experience",
    innovationServices: "Innovation Services",
    governanceRiskCompliance: "Governance, Risk & Compliance",
  };

  // Fetch replies on component mount
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        setLoadingReplies(true);
        const response = await fetch(`/api/admin/submissions/${submission.id}/replies`);
        if (response.ok) {
          const data = await response.json();
          setReplies(data);
        }
      } catch (error) {
        console.error("Error fetching replies:", error);
      } finally {
        setLoadingReplies(false);
      }
    };

    fetchReplies();
  }, [submission.id]);

  const handleReplySent = async () => {
    // Refresh replies after sending
    try {
      const response = await fetch(`/api/admin/submissions/${submission.id}/replies`);
      if (response.ok) {
        const data = await response.json();
        setReplies(data);
      }
    } catch (error) {
      console.error("Error refreshing replies:", error);
    }
  };

  const handleToggleRead = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/submissions/${submission.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !isRead }),
      });

      if (response.ok) {
        setIsRead(!isRead);
      }
    } catch (error) {
      console.error("Error updating submission:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/submissions/${submission.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating submission:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex gap-2">
          <Badge variant={isRead ? "secondary" : "default"}>
            {isRead ? "Read" : "New"}
          </Badge>
          <Badge variant="outline">{submission.status}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {submission.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-lg">{submission.name}</p>
                  {submission.companyName && (
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                      <Building2 className="h-4 w-4" />
                      <span>{submission.companyName}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`mailto:${submission.email}`}
                    className="text-primary hover:underline"
                  >
                    {submission.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`tel:${submission.phone}`}
                    className="text-primary hover:underline"
                  >
                    {submission.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {format(new Date(submission.createdAt), "MMMM d, yyyy 'at' HH:mm")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Interest</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="text-base px-3 py-1">
                {serviceNames[submission.serviceInterest] || submission.serviceInterest}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Message</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {submission.message}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Send Reply</CardTitle>
              <CardDescription>
                Send a reply to {submission.name} at {submission.email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReplyForm submissionId={submission.id} onReplySent={handleReplySent} />
            </CardContent>
          </Card>

          {!loadingReplies && <ReplyHistory replies={replies} />}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={handleToggleRead}
                disabled={loading}
                variant={isRead ? "outline" : "default"}
                className="w-full"
              >
                {isRead ? (
                  <>
                    <XCircle className="h-4 w-4 mr-2" />
                    Mark as Unread
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Mark as Read
                  </>
                )}
              </Button>

              <div className="space-y-2 pt-2 border-t">
                <p className="text-sm font-medium">Change Status</p>
                <div className="space-y-2">
                  <Button
                    onClick={() => handleStatusChange("new")}
                    disabled={loading || submission.status === "new"}
                    variant={submission.status === "new" ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                  >
                    New
                  </Button>
                  <Button
                    onClick={() => handleStatusChange("read")}
                    disabled={loading || submission.status === "read"}
                    variant={submission.status === "read" ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                  >
                    Read
                  </Button>
                  <Button
                    onClick={() => handleStatusChange("archived")}
                    disabled={loading || submission.status === "archived"}
                    variant={submission.status === "archived" ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                  >
                    Archived
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Submission Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">ID:</span>
                <p className="font-mono text-xs">{submission.id}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Created:</span>
                <p>{format(new Date(submission.createdAt), "PPpp")}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Last Updated:</span>
                <p>{format(new Date(submission.updatedAt), "PPpp")}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
