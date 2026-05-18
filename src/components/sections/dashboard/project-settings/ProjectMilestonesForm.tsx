"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/buttons";
import { variantClasses, sizeClasses } from "@/components/ui/buttons/buttonStyles";
import { MilestoneRowMenu } from "@/components/ui/team";
import { CalendarModal, DeleteMilestoneModal } from "@/components/ui/modals";
import { TEAM_WORKSPACE_HREF } from "@/mock/Dashboard";
import { useWorkspaceMilestones } from "@/hooks/useTeam";

export type ProjectMilestoneItem = {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "scheduled";
  date: string;
};

function formatMilestoneSubtitle(ms: ProjectMilestoneItem) {
  if (ms.status === "scheduled") return ms.date;
  if (ms.status === "completed") return `Completed . ${ms.date}`;
  return `In Progress . ${ms.date}`;
}

const ProjectMilestonesForm = () => {
  const { workspaceMilestones, workspaceMilestonesQuery } = useWorkspaceMilestones();
  const [milestones, setMilestones] = useState<ProjectMilestoneItem[]>(workspaceMilestones);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(() => {
    const s = new Set<string>();
    workspaceMilestones.forEach((m) => {
      if (m.status === "completed") s.add(m.id);
    });
    return s;
  });
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [milestoneToDelete, setMilestoneToDelete] = useState<ProjectMilestoneItem | null>(
    null,
  );

  useEffect(() => {
    setMilestones(workspaceMilestones);
    setCheckedIds(
      new Set(
        workspaceMilestones
          .filter((milestone) => milestone.status === "completed")
          .map((milestone) => milestone.id),
      ),
    );
  }, [workspaceMilestones]);

  const toggleChecked = (id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSave = () => {
    console.log("save milestones (mock)", {
      milestones,
      checkedIds: [...checkedIds],
    });
  };

  const handleConfirmDelete = () => {
    if (!milestoneToDelete) return;
    setMilestones((prev) => prev.filter((m) => m.id !== milestoneToDelete.id));
    setCheckedIds((prev) => {
      const next = new Set(prev);
      next.delete(milestoneToDelete.id);
      return next;
    });
    console.log("delete milestone (mock)", milestoneToDelete.id);
  };

  return (
    <div className="space-y-5 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-primary text-lg font-semibold text-content">Project Milestones</h3>
        <Button
          type="button"
          variant="secondary"
          size="md"
          className="w-full shrink-0 sm:w-auto"
          onClick={() => setCalendarOpen(true)}
        >
          <Calendar className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
          Schedule a milestone
        </Button>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
        <ul className="flex flex-col gap-0">
          {workspaceMilestonesQuery.isLoading ? (
            <li className="py-4 font-primary text-sm text-content-light">Loading milestones...</li>
          ) : milestones.map((m) => (
            <li
              key={m.id}
              className="flex items-center gap-3 border-b border-gray-100 py-3 last:border-b-0"
            >
              <input
                type="checkbox"
                checked={checkedIds.has(m.id)}
                onChange={() => toggleChecked(m.id)}
                className="h-4 w-4 shrink-0 rounded border-gray-300 text-primary accent-primary
                  focus:ring-2 focus:ring-primary/25 focus:ring-offset-0"
                aria-label={`Mark ${m.title} complete`}
              />
              <div className="min-w-0 flex-1">
                <p className="font-primary text-sm font-semibold text-content">{m.title}</p>
                <p className="mt-0.5 font-primary text-xs text-content-light">
                  {formatMilestoneSubtitle(m)}
                </p>
              </div>
              <MilestoneRowMenu
                milestoneId={m.id}
                title={m.title}
                onDelete={() => setMilestoneToDelete(m)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button type="button" variant="primary" size="md" onClick={handleSave}>
          Save
        </Button>
        <Link
          href={TEAM_WORKSPACE_HREF}
          className={`inline-flex items-center justify-center rounded-lg font-primary font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${variantClasses.secondary} ${sizeClasses.md}`}
        >
          Cancel
        </Link>
      </div>

      <CalendarModal isOpen={calendarOpen} onClose={() => setCalendarOpen(false)} />

      <DeleteMilestoneModal
        isOpen={milestoneToDelete !== null}
        onClose={() => setMilestoneToDelete(null)}
        milestoneTitle={milestoneToDelete?.title ?? ""}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ProjectMilestonesForm;
