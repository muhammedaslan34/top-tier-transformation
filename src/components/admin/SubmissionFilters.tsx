"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SubmissionFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  serviceInterest: string;
  status: string;
  isRead: string;
  startDate: string;
  endDate: string;
}

export function SubmissionFilters({ onFilterChange }: SubmissionFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    serviceInterest: "",
    status: "",
    isRead: "",
    startDate: "",
    endDate: "",
  });

  const [searchInput, setSearchInput] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchInput }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    onFilterChange(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleReset = () => {
    setFilters({
      search: "",
      serviceInterest: "",
      status: "",
      isRead: "",
      startDate: "",
      endDate: "",
    });
    setSearchInput("");
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>Search</Label>
          <Input
            placeholder="Search by name, email, or message..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Service Interest</Label>
          <Select
            value={filters.serviceInterest || "all"}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, serviceInterest: value === "all" ? "" : value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All services</SelectItem>
              <SelectItem value="digitalTransformation">Digital Transformation</SelectItem>
              <SelectItem value="dataGovernance">Data Governance</SelectItem>
              <SelectItem value="cloudComputing">Cloud Computing</SelectItem>
              <SelectItem value="beneficiaryExperience">Beneficiary Experience</SelectItem>
              <SelectItem value="innovationServices">Innovation Services</SelectItem>
              <SelectItem value="governanceRiskCompliance">Governance, Risk & Compliance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={filters.status || "all"}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, status: value === "all" ? "" : value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Read Status</Label>
          <Select
            value={filters.isRead || "all"}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, isRead: value === "all" ? "" : value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="false">Unread</SelectItem>
              <SelectItem value="true">Read</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Start Date</Label>
          <Input
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, startDate: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>End Date</Label>
          <Input
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, endDate: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" onClick={handleReset}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
