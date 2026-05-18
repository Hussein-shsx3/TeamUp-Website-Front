import type { Metadata } from "next";
import ProjectDetailPage from "@/components/sections/dashboard/findTeam/ProjectDetailPage";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return [];
}

export const metadata: Metadata = {
  title: "TeamUp — Project Details",
};

const ProjectDetailRoute = async ({ params }: Props) => {
  const { id } = await params;
  return <ProjectDetailPage id={id} />;
};

export default ProjectDetailRoute;
