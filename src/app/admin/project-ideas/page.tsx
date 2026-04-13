import type { Metadata } from "next";
import { ProjectIdeasManagementView } from "@/components/sections/admin/projectIdeas";

export const metadata: Metadata = {
  title: "TeamUp — Project Ideas",
};

export default function AdminProjectIdeasPage() {
  return <ProjectIdeasManagementView />;
}