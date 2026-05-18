"use client";

import { useState } from "react";
import { MOCK_PROJECT } from "@/mock/Dashboard";
import { LeaveProjectModal } from "@/components/ui/modals";
import type { WorkspaceView } from "@/mock/TeamWorkspace";
import { WORKSPACE_PROJECT_DESCRIPTION } from "@/mock/TeamWorkspace";
import {
  useWorkspaceFiles,
  useWorkspaceMeetings,
  useWorkspaceTeam,
  useWorkspaceTasks,
} from "@/hooks/useTeam";
import WorkspaceHeader from "./WorkspaceHeader";
import WorkspaceProjectOverview from "./WorkspaceProjectOverview";
import TeamMembersCard from "./TeamMembersCard";
import WorkspaceTasksCard from "./WorkspaceTasksCard";
import SharedFilesCard from "./SharedFilesCard";
import UpcomingMeetingsCard from "./UpcomingMeetingsCard";
import TeamChatPanel from "./TeamChatPanel";

interface TeamWorkspaceViewProps {
  view: WorkspaceView;
}

const TeamWorkspaceView = ({ view }: TeamWorkspaceViewProps) => {
  const isLead = view === "lead";
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const {
    currentUserQuery,
    workspaceProject,
    workspaceTeam,
    workspaceTeamMembers,
    workspaceTeamMembersQuery,
  } = useWorkspaceTeam();
  const { workspaceTasks } = useWorkspaceTasks();
  const { workspaceFiles, workspaceFilesQuery } = useWorkspaceFiles(
    workspaceProject?.id ?? null,
    workspaceTeamMembers,
  );
  const { workspaceMeetings, workspaceMeetingsQuery } = useWorkspaceMeetings(
    workspaceTeam?.id ?? null,
  );

  const projectName = workspaceProject?.title ?? MOCK_PROJECT.name;
  const supervisor =
    workspaceProject
      ? `${workspaceProject.creator.firstName} ${workspaceProject.creator.lastName}`.trim() ||
        workspaceProject.creator.username
      : MOCK_PROJECT.supervisor;
  const description =
    workspaceProject?.description ?? workspaceProject?.summary ?? WORKSPACE_PROJECT_DESCRIPTION;
  const onlineCount = workspaceTeamMembers.length;

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-6">
      <div className="flex min-w-0 flex-1 flex-col">
        <WorkspaceHeader
          isLead={isLead}
          onLeaveRequest={() => setLeaveModalOpen(true)}
        />
        <WorkspaceProjectOverview
          projectName={projectName}
          description={description}
          isLead={isLead}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          <TeamMembersCard
            members={workspaceTeamMembers}
            isLead={isLead}
            isLoading={workspaceTeamMembersQuery.isLoading}
          />
          <WorkspaceTasksCard initialTasks={workspaceTasks} isLead={isLead} />
          <SharedFilesCard
            files={workspaceFiles}
            isLead={isLead}
            isLoading={workspaceFilesQuery.isLoading}
          />
          <UpcomingMeetingsCard
            meetings={workspaceMeetings}
            isLead={isLead}
            isLoading={workspaceMeetingsQuery.isLoading}
          />
        </div>
      </div>
      <div className="w-full shrink-0 lg:sticky lg:top-24 lg:z-10 lg:w-[min(100%,380px)] lg:self-start xl:w-[400px]">
        <TeamChatPanel
          onlineCount={onlineCount}
          teamId={workspaceTeam?.id ?? null}
          currentUserId={currentUserQuery.data?.user.id ?? null}
        />
      </div>

      <LeaveProjectModal
        isOpen={leaveModalOpen}
        projectName={projectName}
        onClose={() => setLeaveModalOpen(false)}
        onConfirm={() => console.log("leave project confirmed (mock)")}
      />
    </div>
  );
};

export default TeamWorkspaceView;
