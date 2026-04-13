"use client";

import { Filter, Search } from "lucide-react";
import { ADMIN_TEAM_STATUS_FILTERS, type AdminTeamStatus } from "@/mock/AdminTeams";

interface TeamsToolbarProps {
  query: string;
  statusFilter: AdminTeamStatus | "All";
  onQueryChange: (value: string) => void;
  onStatusFilterChange: (value: AdminTeamStatus | "All") => void;
}

const TeamsToolbar = ({
  query,
  statusFilter,
  onQueryChange,
  onStatusFilterChange,
}: TeamsToolbarProps) => {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full">
        <Search
          size={16}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          type="text"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by team name"
          aria-label="Search teams"
          className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 font-primary text-sm text-content placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
        />
      </div>

      <div className="flex flex-row justify-center gap-3">
        <div className="relative">
          <Filter
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <select
            value={statusFilter}
            onChange={(event) => onStatusFilterChange(event.target.value as AdminTeamStatus | "All")}
            aria-label="Filter by status"
            className="h-11 rounded-lg border border-slate-200 bg-white pl-10 pr-4 font-primary text-sm text-content focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
          >
            {ADMIN_TEAM_STATUS_FILTERS.map((option) => (
              <option key={option} value={option}>
                Status : {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TeamsToolbar;