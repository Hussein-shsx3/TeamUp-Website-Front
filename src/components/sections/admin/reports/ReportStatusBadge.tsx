import type { AdminReportStatus } from "@/mock/AdminReports";

interface ReportStatusBadgeProps {
  status: AdminReportStatus;
}

const statusClasses: Record<AdminReportStatus, string> = {
  New: "bg-amber-50 text-amber-600 ring-amber-100",
  "In Review": "bg-blue-50 text-blue-600 ring-blue-100",
  Resolved: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  Rejected: "bg-rose-50 text-rose-600 ring-rose-100",
};

const ReportStatusBadge = ({ status }: ReportStatusBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 font-primary text-[11px] font-semibold ring-1 ${statusClasses[status]}`}
    >
      {status}
    </span>
  );
};

export default ReportStatusBadge;