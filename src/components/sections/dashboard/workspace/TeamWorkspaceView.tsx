"use client";

import { MOCK_PROJECT } from "@/mock/Dashboard";
import type { WorkspaceView } from "@/mock/TeamWorkspace";
import {
  WORKSPACE_PROJECT_DESCRIPTION,
  MOCK_WORKSPACE_MEMBERS,
  MOCK_WORKSPACE_TASKS,
  MOCK_WORKSPACE_FILES,
  MOCK_WORKSPACE_MEETINGS,
  MOCK_WORKSPACE_CHAT_MESSAGES,
  MOCK_WORKSPACE_ONLINE_COUNT,
} from "@/mock/TeamWorkspace";
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

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-6">
      <div className="flex min-w-0 flex-1 flex-col">
        <WorkspaceHeader isLead={isLead} />
        <WorkspaceProjectOverview
          projectName={MOCK_PROJECT.name}
          supervisor={MOCK_PROJECT.supervisor}
          description={WORKSPACE_PROJECT_DESCRIPTION}
          isLead={isLead}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          <TeamMembersCard members={MOCK_WORKSPACE_MEMBERS} isLead={isLead} />
          <WorkspaceTasksCard initialTasks={MOCK_WORKSPACE_TASKS} isLead={isLead} />
          <SharedFilesCard files={MOCK_WORKSPACE_FILES} isLead={isLead} />
          <UpcomingMeetingsCard meetings={MOCK_WORKSPACE_MEETINGS} isLead={isLead} />
        </div>
      </div>
      <div className="w-full shrink-0 lg:sticky lg:top-24 lg:z-10 lg:w-[min(100%,380px)] lg:self-start xl:w-[400px]">
        <TeamChatPanel
          messages={MOCK_WORKSPACE_CHAT_MESSAGES}
          onlineCount={MOCK_WORKSPACE_ONLINE_COUNT}
        />
      </div>
    </div>
  );
};

export default TeamWorkspaceView;
