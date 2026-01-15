"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReplyFormProps {
  submissionId: string;
  onReplySent: () => void;
}

export function ReplyForm({ submissionId, onReplySent }: ReplyFormProps) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/submissions/${submissionId}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send reply");
      }

      // Success
      setMessage("");
      toast({
        title: "Reply sent",
        description: data.warning 
          ? "Reply saved but email may not have been sent" 
          : "Your reply has been sent successfully",
      });
      
      // Notify parent to refresh reply history
      onReplySent();
    } catch (error) {
      console.error("Error sending reply:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send reply",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reply-message">Your Reply</Label>
        <Textarea
          id="reply-message"
          placeholder="Type your reply message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          disabled={loading}
          className="resize-none"
        />
      </div>
      <Button type="submit" disabled={loading || !message.trim()}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Send Reply
          </>
        )}
      </Button>
    </form>
  );
}
