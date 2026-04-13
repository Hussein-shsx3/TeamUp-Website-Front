"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "@/components/ui/navigation";
import { Heading } from "@/components/ui/typography";
import { ADMIN_TEAM_PAGE_SIZE_OPTIONS, ADMIN_TEAM_REPORTS, type AdminTeamReportRecord, type AdminTeamStatus } from "@/mock/AdminTeams";
import TeamsBulkActionsBar from "./TeamsBulkActionsBar";
import TeamsTable from "./TeamsTable";
import TeamsToolbar from "./TeamsToolbar";

const INITIAL_PAGE_SIZE = 12;

const TeamsManagementView = () => {
  const router = useRouter();
  const [teams, setTeams] = useState<AdminTeamReportRecord[]>(ADMIN_TEAM_REPORTS);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdminTeamStatus | "All">("All");
  const [itemsPerPage, setItemsPerPage] = useState(INITIAL_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(
    () => new Set(ADMIN_TEAM_REPORTS.filter((team) => team.selected).map((team) => team.id)),
  );
  const [notice, setNotice] = useState<string | null>(null);

  const filteredTeams = useMemo(() => {
    const search = query.trim().toLowerCase();

    return teams.filter((team) => {
      const matchesQuery =
        search.length === 0 ||
        team.reportTitle.toLowerCase().includes(search) ||
        team.teamMentor.toLowerCase().includes(search) ||
        team.members.some((member) => member.name.toLowerCase().includes(search));
      const matchesStatus = statusFilter === "All" || team.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter, teams]);

  const totalPages = Math.max(1, Math.ceil(filteredTeams.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedTeams = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    return filteredTeams.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTeams, itemsPerPage, safeCurrentPage]);

  const selectedCount = selectedIds.size;

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage, query, statusFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setNotice(null);
  }, [itemsPerPage, query, statusFilter]);

  const toggleTeamSelection = (teamId: number) => {
    setSelectedIds((previous) => {
      const next = new Set(previous);
      if (next.has(teamId)) {
        next.delete(teamId);
      } else {
        next.add(teamId);
      }
      return next;
    });
  };

  const toggleVisibleTeamsSelection = (teamIds: number[]) => {
    setSelectedIds((previous) => {
      const next = new Set(previous);
      const allVisibleSelected = teamIds.every((teamId) => next.has(teamId));

      if (allVisibleSelected) {
        teamIds.forEach((teamId) => next.delete(teamId));
        return next;
      }

      teamIds.forEach((teamId) => next.add(teamId));
      return next;
    });
  };

  const updateTeamStatus = (teamIds: number[], status: AdminTeamStatus) => {
    setTeams((previous) =>
      previous.map((team) => (teamIds.includes(team.id) ? { ...team, status } : team)),
    );
  };

  const handleViewReport = (team: AdminTeamReportRecord) => {
    router.push(`/admin/teams/${team.id}`);
  };

  const handleReject = (team: AdminTeamReportRecord) => {
    updateTeamStatus([team.id], "Rejected");
    setNotice(`${team.reportTitle} rejected`);
  };

  const handleBulkReject = () => {
    const ids = [...selectedIds];
    if (ids.length === 0) return;
    updateTeamStatus(ids, "Rejected");
    setNotice(`${ids.length} team${ids.length > 1 ? "s" : ""} rejected`);
  };

  return (
    <div className="flex flex-col">
      <Breadcrumb items={[{ label: "Dashboard", href: "/admin" }, { label: "Teams" }]} />

      <section className="mb-5 space-y-1">
        <Heading level="h4" className="text-[28px] font-semibold text-content sm:text-[30px]">
          Teams Management
        </Heading>
        <p className="max-w-2xl font-primary text-sm text-slate-500 sm:text-base">
          Monitor and manage all teams
        </p>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
        <TeamsToolbar
          query={query}
          statusFilter={statusFilter}
          onQueryChange={setQuery}
          onStatusFilterChange={setStatusFilter}
        />

        {notice ? (
          <div className="border-b border-slate-100 px-4 py-3 sm:px-5">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 px-3 py-2 font-primary text-sm text-primary">
              <CheckCircle2 size={16} aria-hidden="true" />
              {notice}
            </div>
          </div>
        ) : null}

        <TeamsTable
          teams={paginatedTeams}
          selectedIds={selectedIds}
          onToggleTeam={toggleTeamSelection}
          onToggleSelectAll={toggleVisibleTeamsSelection}
          onViewReport={handleViewReport}
          onReject={handleReject}
        />

        <div className="flex flex-col gap-4 border-t border-slate-100 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-3 sm:justify-start">
            <span className="font-primary text-xs text-slate-500 sm:text-sm">Show result:</span>
            <select
              value={itemsPerPage}
              onChange={(event) => setItemsPerPage(Number(event.target.value))}
              className="h-8 w-20 rounded-lg border border-slate-200 bg-white pl-2 pr-8 font-primary text-xs text-slate-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 sm:w-16"
            >
              {ADMIN_TEAM_PAGE_SIZE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-center gap-1 overflow-x-auto pb-1 lg:justify-end lg:pb-0">
            <button
              type="button"
              onClick={() => setCurrentPage((previous) => Math.max(1, previous - 1))}
              disabled={currentPage === 1}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-transparent text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`inline-flex h-9 min-w-9 shrink-0 items-center justify-center rounded-full px-3 font-primary text-sm transition-colors ${
                  safeCurrentPage === page
                    ? "bg-primary/10 text-primary"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
                aria-current={safeCurrentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((previous) => Math.min(totalPages, previous + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-transparent text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex justify-center px-4 pb-4 sm:px-5 sm:pb-5">
          <TeamsBulkActionsBar selectedCount={selectedCount} onReject={handleBulkReject} />
        </div>
      </section>
    </div>
  );
};

export default TeamsManagementView;