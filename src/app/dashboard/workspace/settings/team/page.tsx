import type { Metadata } from "next";
import { ProjectTeamManagementView } from "@/components/sections/dashboard/project-settings";

export const metadata: Metadata = {
  title: "TeamUp — Project Settings · Team Management",
};

const ProjectSettingsTeamPage = () => {
  return <ProjectTeamManagementView />;
};

export default ProjectSettingsTeamPage;
