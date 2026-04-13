import type { AdminProjectIdeaStatus } from "@/mock/ProjectsIdeas";

interface ProjectIdeaStatusBadgeProps {
  status: AdminProjectIdeaStatus;
}

const statusClasses: Record<AdminProjectIdeaStatus, string> = {
  Pending: "bg-amber-50 text-amber-600 ring-amber-100",
  Approved: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  Rejected: "bg-rose-50 text-rose-600 ring-rose-100",
};

const ProjectIdeaStatusBadge = ({ status }: ProjectIdeaStatusBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 font-primary text-[11px] font-semibold ring-1 ${statusClasses[status]}`}
    >
      {status}
    </span>
  );
};

export default ProjectIdeaStatusBadge;