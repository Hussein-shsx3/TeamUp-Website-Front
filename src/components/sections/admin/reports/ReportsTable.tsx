"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import { IconButton } from "@/components/ui/buttons";
import type { AdminReportRecord } from "@/mock/AdminReports";
import ReportsActionsMenu from "./ReportsActionsMenu";
import ReportStatusBadge from "./ReportStatusBadge";

interface ReportsTableProps {
  reports: AdminReportRecord[];
  selectedIds: Set<number>;
  onToggleReport: (id: number) => void;
  onToggleSelectAll: (reportIds: number[]) => void;
  onViewReport: (report: AdminReportRecord) => void;
  onMarkResolved: (report: AdminReportRecord) => void;
  onMarkInReview: (report: AdminReportRecord) => void;
  onReject: (report: AdminReportRecord) => void;
  onToggleSort: () => void;
  sortDirection: "asc" | "desc";
}

const ReportsTable = ({
  reports,
  selectedIds,
  onToggleReport,
  onToggleSelectAll,
  onViewReport,
  onMarkResolved,
  onMarkInReview,
  onReject,
  onToggleSort,
  sortDirection,
}: ReportsTableProps) => {
  const selectAllRef = useRef<HTMLInputElement>(null);
  const allSelected = reports.length > 0 && reports.every((report) => selectedIds.has(report.id));
  const someSelected = reports.some((report) => selectedIds.has(report.id));

  useEffect(() => {
    if (!selectAllRef.current) return;
    selectAllRef.current.indeterminate = someSelected && !allSelected;
  }, [allSelected, someSelected]);

  const reportIds = useMemo(() => reports.map((report) => report.id), [reports]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-[980px] w-full border-separate border-spacing-0">
        <thead>
          <tr className="bg-slate-50/80 text-left font-primary text-[11px] uppercase tracking-wide text-slate-400">
            <th className="w-12 border-b border-slate-100 px-4 py-4">
              <input
                ref={selectAllRef}
                type="checkbox"
                checked={allSelected}
                onChange={() => onToggleSelectAll(reportIds)}
                aria-label="Select all reports on the current page"
                className="h-4 w-4 cursor-pointer rounded border-slate-300 text-primary accent-primary focus:ring-primary"
              />
            </th>
            <th className="border-b border-slate-100 px-4 py-4">Reports Title</th>
            <th className="border-b border-slate-100 px-4 py-4">Reported by</th>
            <th className="border-b border-slate-100 px-4 py-4">Status</th>
            <th className="border-b border-slate-100 px-4 py-4">
              <button
                type="button"
                onClick={onToggleSort}
                className="inline-flex items-center gap-1 text-left transition-colors hover:text-slate-600"
                aria-label={`Sort by date ${sortDirection === "desc" ? "descending" : "ascending"}`}
              >
                Date
                <span aria-hidden="true" className="text-[10px]">↕</span>
              </button>
            </th>
            <th className="border-b border-slate-100 px-4 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => {
            const isSelected = selectedIds.has(report.id);

            return (
              <tr
                key={report.id}
                className={`text-sm text-content transition-colors hover:bg-slate-50/80 ${
                  isSelected ? "bg-primary/5" : ""
                }`}
              >
                <td className="border-b border-slate-100 px-4 py-4 align-middle">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onClick={(event) => event.stopPropagation()}
                    onChange={(event) => {
                      event.stopPropagation();
                      onToggleReport(report.id);
                    }}
                    aria-label={`Select ${report.reportTitle}`}
                    className="h-4 w-4 cursor-pointer rounded border-slate-300 text-primary accent-primary focus:ring-primary"
                  />
                </td>
                <td className="border-b border-slate-100 px-4 py-4 font-primary text-sm font-medium text-content align-middle">
                  {report.reportTitle}
                </td>
                <td className="border-b border-slate-100 px-4 py-4 align-middle">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                      <Image
                        src={report.reportedByAvatar}
                        alt={report.reportedBy}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-primary text-sm font-medium text-content">
                        {report.reportedBy}
                      </p>
                      <p className="truncate font-primary text-xs text-slate-500">{report.reportedByRole}</p>
                    </div>
                  </div>
                </td>
                <td className="border-b border-slate-100 px-4 py-4 align-middle">
                  <ReportStatusBadge status={report.status} />
                </td>
                <td className="border-b border-slate-100 px-4 py-4 font-primary text-sm text-slate-600 align-middle">
                  {report.date}
                </td>
                <td className="border-b border-slate-100 px-4 py-4 text-right align-middle">
                  <div className="inline-flex items-center justify-end gap-1">
                    <IconButton
                      type="button"
                      variant="ghost"
                      size="sm"
                      aria-label={`View details for ${report.reportTitle}`}
                      className="rounded-full text-content-light hover:bg-slate-100"
                      onClick={(event) => {
                        event.stopPropagation();
                        onViewReport(report);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </IconButton>

                    <ReportsActionsMenu
                      report={report}
                      onMarkResolved={onMarkResolved}
                      onMarkInReview={onMarkInReview}
                      onReject={onReject}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {reports.length === 0 ? (
        <div className="border-b border-slate-100 px-4 py-16 text-center font-primary text-sm text-slate-500">
          No reports found for the current search and filter settings.
        </div>
      ) : null}
    </div>
  );
};

export default ReportsTable;