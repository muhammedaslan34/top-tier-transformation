"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { FilterState } from "./SubmissionFilters";

interface ExportButtonProps {
  filters: FilterState;
}

export function ExportButton({ filters }: ExportButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.serviceInterest) params.append("serviceInterest", filters.serviceInterest);
      if (filters.status) params.append("status", filters.status);
      if (filters.isRead) params.append("isRead", filters.isRead);
      if (filters.startDate) params.append("startDate", filters.startDate);
      if (filters.endDate) params.append("endDate", filters.endDate);

      const response = await fetch(`/api/admin/submissions/export?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `submissions-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Export error:", error);
      alert("Failed to export submissions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleExport} disabled={loading} variant="outline">
      <Download className="h-4 w-4 mr-2" />
      {loading ? "Exporting..." : "Export CSV"}
    </Button>
  );
}
