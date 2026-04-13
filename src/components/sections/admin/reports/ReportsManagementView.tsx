"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "@/components/ui/navigation";
import { Heading } from "@/components/ui/typography";
import {
  ADMIN_REPORT_PAGE_SIZE_OPTIONS,
  ADMIN_REPORTS,
  type AdminReportRecord,
  type AdminReportStatus,
} from "@/mock/AdminReports";
import ReportsBulkActionsBar from "./ReportsBulkActionsBar";
import ReportsTable from "./ReportsTable";
import ReportsToolbar from "./ReportsToolbar";

const INITIAL_PAGE_SIZE = 12;

const ReportsManagementView = () => {
  const router = useRouter();
  const [reports, setReports] = useState<AdminReportRecord[]>(ADMIN_REPORTS);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdminReportStatus | "All">("All");
  const [itemsPerPage, setItemsPerPage] = useState(INITIAL_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(
    () => new Set(ADMIN_REPORTS.filter((report) => report.selected).map((report) => report.id)),
  );
  const [notice, setNotice] = useState<string | null>(null);

  const filteredReports = useMemo(() => {
    const search = query.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesQuery =
        search.length === 0 ||
        report.teamName.toLowerCase().includes(search) ||
        report.reportedBy.toLowerCase().includes(search) ||
        report.reportedByEmail.toLowerCase().includes(search);
      const matchesStatus = statusFilter === "All" || report.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, reports, statusFilter]);

  const sortedReports = useMemo(() => {
    return [...filteredReports].sort((leftReport, rightReport) => {
      const leftTime = new Date(`2026-03-01 ${leftReport.date}`).getTime();
      const rightTime = new Date(`2026-03-01 ${rightReport.date}`).getTime();
      return sortDirection === "desc" ? rightTime - leftTime : leftTime - rightTime;
    });
  }, [filteredReports, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedReports.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedReports = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    return sortedReports.slice(startIndex, startIndex + itemsPerPage);
  }, [itemsPerPage, safeCurrentPage, sortedReports]);

  const selectedCount = selectedIds.size;

  useEffect(() => {
    setCurrentPage(1);
  }, [query, statusFilter, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setNotice(null);
  }, [query, statusFilter, sortDirection, itemsPerPage]);

  const toggleReportSelection = (reportId: number) => {
    setSelectedIds((previous) => {
      const next = new Set(previous);
      if (next.has(reportId)) {
        next.delete(reportId);
      } else {
        next.add(reportId);
      }
      return next;
    });
  };

  const toggleVisibleReportsSelection = (reportIds: number[]) => {
    setSelectedIds((previous) => {
      const next = new Set(previous);
      const allVisibleSelected = reportIds.every((reportId) => next.has(reportId));

      if (allVisibleSelected) {
        reportIds.forEach((reportId) => next.delete(reportId));
        return next;
      }

      reportIds.forEach((reportId) => next.add(reportId));
      return next;
    });
  };

  const updateReportStatus = (reportIds: number[], status: AdminReportStatus) => {
    setReports((previous) =>
      previous.map((report) => (reportIds.includes(report.id) ? { ...report, status } : report)),
    );
  };

  const handleViewReport = (report: AdminReportRecord) => {
    router.push(`/admin/reports/${report.id}`);
  };

  const handleMarkResolved = (report: AdminReportRecord) => {
    updateReportStatus([report.id], "Resolved");
    setNotice(`${report.teamName} marked as resolved`);
  };

  const handleMarkInReview = (report: AdminReportRecord) => {
    updateReportStatus([report.id], "In Review");
    setNotice(`${report.teamName} marked as in review`);
  };

  const handleReject = (report: AdminReportRecord) => {
    updateReportStatus([report.id], "Rejected");
    setNotice(`${report.teamName} rejected`);
  };

  const handleBulkReject = () => {
    const ids = [...selectedIds];
    if (ids.length === 0) return;
    updateReportStatus(ids, "Rejected");
    setNotice(`${ids.length} report${ids.length > 1 ? "s" : ""} rejected`);
  };

  return (
    <div className="flex flex-col">
      <Breadcrumb items={[{ label: "Dashboard", href: "/admin" }, { label: "Reports" }]} />

      <section className="mb-5 space-y-1">
        <Heading level="h4" className="text-[28px] font-semibold text-content sm:text-[30px]">
          Reports Management
        </Heading>
        <p className="max-w-2xl font-primary text-sm text-slate-500 sm:text-base">
          Review and manage user-submitted reports
        </p>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
        <ReportsToolbar
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

        <ReportsTable
          reports={paginatedReports}
          selectedIds={selectedIds}
          onToggleReport={toggleReportSelection}
          onToggleSelectAll={toggleVisibleReportsSelection}
          onViewReport={handleViewReport}
          onMarkResolved={handleMarkResolved}
          onMarkInReview={handleMarkInReview}
          onReject={handleReject}
          onToggleSort={() => setSortDirection((previous) => (previous === "desc" ? "asc" : "desc"))}
          sortDirection={sortDirection}
        />

        <div className="flex flex-col gap-4 border-t border-slate-100 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-3 sm:justify-start">
            <span className="font-primary text-xs text-slate-500 sm:text-sm">Show result:</span>
            <select
              value={itemsPerPage}
              onChange={(event) => setItemsPerPage(Number(event.target.value))}
              className="h-8 w-20 rounded-lg border border-slate-200 bg-white pl-2 pr-8 font-primary text-xs text-slate-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 sm:w-16"
            >
              {ADMIN_REPORT_PAGE_SIZE_OPTIONS.map((option) => (
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
          <ReportsBulkActionsBar selectedCount={selectedCount} onReject={handleBulkReject} />
        </div>
      </section>
    </div>
  );
};

export default ReportsManagementView;