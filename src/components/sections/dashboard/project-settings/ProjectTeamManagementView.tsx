"use client";

import { ProjectTeamManagementForm } from "@/components/sections/dashboard";
import { useWorkspaceTeam } from "@/hooks/useTeam";

const ProjectTeamManagementView = () => {
  const { workspaceProject, workspaceTeam, workspaceTeamMembers } = useWorkspaceTeam();

  return (
    <ProjectTeamManagementForm
      initialCapacity={workspaceTeam?.maxMembers ?? 5}
      initialRequiredSkills={workspaceProject?.requiredSkills ?? []}
      initialMembers={workspaceTeamMembers}
      isLoading={workspaceTeamMembers.length === 0 && !workspaceTeam}
    />
  );
};

export default ProjectTeamManagementView;