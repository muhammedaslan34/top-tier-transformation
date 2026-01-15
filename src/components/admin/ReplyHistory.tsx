"use client";

import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, User } from "lucide-react";

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

interface ReplyHistoryProps {
  replies: Reply[];
}

export function ReplyHistory({ replies }: ReplyHistoryProps) {
  if (replies.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Reply History</CardTitle>
          <CardDescription>No replies sent yet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No replies have been sent for this submission.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reply History</CardTitle>
        <CardDescription>
          {replies.length} {replies.length === 1 ? "reply" : "replies"} sent
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="border rounded-lg p-4 bg-white space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {reply.adminUser ? (
                      <User className="h-4 w-4 text-primary" />
                    ) : (
                      <MessageSquare className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">
                      {reply.adminUser?.name || reply.adminUser?.email || "System"}
                    </p>
                    {reply.adminUser?.name && reply.adminUser?.email && (
                      <p className="text-xs text-muted-foreground">
                        {reply.adminUser.email}
                      </p>
                    )}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {format(new Date(reply.sentAt), "MMM d, yyyy 'at' HH:mm")}
                </Badge>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                  {reply.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
