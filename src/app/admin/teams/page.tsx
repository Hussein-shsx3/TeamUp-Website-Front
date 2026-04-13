import type { Metadata } from "next";
import { TeamsManagementView } from "@/components/sections/admin/teams";

export const metadata: Metadata = {
  title: "TeamUp — Admin Teams",
};

export default function AdminTeamsPage() {
  return <TeamsManagementView />;
}