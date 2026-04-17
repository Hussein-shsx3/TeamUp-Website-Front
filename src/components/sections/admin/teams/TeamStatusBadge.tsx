import type { AdminTeamStatus } from "@/mock/AdminTeams";

interface TeamStatusBadgeProps {
  status: AdminTeamStatus;
}

const statusClasses: Record<AdminTeamStatus, string> = {
  Completed: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  "In Progress": "bg-blue-50 text-blue-600 ring-blue-100",
  Pending: "bg-amber-50 text-amber-600 ring-amber-100",
  Rejected: "bg-rose-50 text-rose-600 ring-rose-100",
  Disabled: "bg-slate-100 text-slate-500 ring-slate-200",
};

const TeamStatusBadge = ({ status }: TeamStatusBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 font-primary text-[11px] font-semibold ring-1 ${statusClasses[status]}`}
    >
      {status}
    </span>
  );
};

export default TeamStatusBadge;