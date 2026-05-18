"use client";

import { Heading } from "@/components/ui/typography";
import { useWorkspaceMilestones } from "@/hooks/useTeam";

const STATUS_DOT: Record<string, string> = {
  completed: "bg-primary",
  "in-progress": "bg-green-400",
  scheduled: "bg-gray-300",
};

const STATUS_TEXT: Record<string, string> = {
  completed: "text-content-light",
  "in-progress": "text-primary font-medium",
  scheduled: "text-content-muted",
};

const MilestoneRoadmap = () => {
  const { workspaceMilestones, workspaceMilestonesQuery } = useWorkspaceMilestones();

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100
      shadow-[0_2px_16px_rgba(0,0,0,0.06)] p-5 flex flex-col gap-4"
    >
      <Heading level="h6" className="font-semibold text-content">
        Milestone Roadmap
      </Heading>

      <ol className="flex flex-col">
        {workspaceMilestonesQuery.isLoading ? (
          <li className="py-4 font-primary text-sm text-content-light">Loading milestones...</li>
        ) : workspaceMilestones.length === 0 ? (
          <li className="py-4 font-primary text-sm text-content-light">No milestones found.</li>
        ) : workspaceMilestones.map((ms, idx) => {
          const isLast = idx === workspaceMilestones.length - 1;
          const nextMs = workspaceMilestones[idx + 1];

          /* connector line is primary only when both this AND next are completed */
          const lineClass =
            ms.status === "completed" && nextMs?.status === "completed"
              ? "bg-primary"
              : "bg-gray-200";

          return (
            <li key={ms.id} className="flex gap-3">
              {/* dot + connector */}
              <div className="flex flex-col items-center flex-shrink-0">
                <span
                  className={`w-3 h-3 rounded-full mt-1 flex-shrink-0
                    ${STATUS_DOT[ms.status]}`}
                  aria-hidden="true"
                />
                {!isLast && (
                  <span
                    className={`w-px flex-1 my-1 ${lineClass}`}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* text */}
              <div className="pb-4">
                <p
                  className={`font-primary text-sm leading-snug
                  ${STATUS_TEXT[ms.status]}`}
                >
                  {ms.title}
                </p>
                <p className="font-primary text-[11px] text-content-muted mt-0.5">
                  {ms.date}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default MilestoneRoadmap;
