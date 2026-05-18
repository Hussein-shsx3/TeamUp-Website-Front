import type { Metadata } from "next";
import { ProjectMilestonesForm } from "@/components/sections/dashboard";

export const metadata: Metadata = {
  title: "TeamUp — Project Settings · Milestones",
};

const ProjectSettingsMilestonesPage = () => {
  return <ProjectMilestonesForm />;
};

export default ProjectSettingsMilestonesPage;
