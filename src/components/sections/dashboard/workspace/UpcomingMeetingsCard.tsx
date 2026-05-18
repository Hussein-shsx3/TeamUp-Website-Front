"use client";

import { Video } from "lucide-react";
import WorkspaceCard from "./WorkspaceCard";
import { Button } from "@/components/ui/buttons";
import type { WorkspaceMeetingItem } from "@/hooks/useTeam";

interface UpcomingMeetingsCardProps {
  meetings: WorkspaceMeetingItem[];
  isLead: boolean;
  isLoading?: boolean;
}

const UpcomingMeetingsCard = ({ meetings, isLead, isLoading = false }: UpcomingMeetingsCardProps) => {
  return (
    <WorkspaceCard title="Upcoming Meetings">
      <ul className="mb-4 flex flex-col gap-3">
        {isLoading ? (
          <li className="py-4 font-primary text-sm text-content-light">Loading meetings...</li>
        ) : meetings.length === 0 ? (
          <li className="py-4 font-primary text-sm text-content-light">No upcoming meetings.</li>
        ) : meetings.map((m) => (
          <li key={m.id} className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
              <Video className="h-5 w-5 text-primary" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="font-primary text-sm font-medium text-content">{m.title}</p>
              <p className="mt-0.5 font-primary text-[11px] text-content-light">
                {m.dateLabel} · {m.timeLabel}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <Button
        type="button"
        variant="primary"
        size="md"
        disabled={!isLead}
        className={`w-full ${!isLead ? "bg-gray-100 text-content-muted hover:bg-gray-100" : ""}`}
        onClick={() => console.log("schedule meeting")}
      >
        Schedule new meeting
      </Button>
    </WorkspaceCard>
  );
};

export default UpcomingMeetingsCard;
