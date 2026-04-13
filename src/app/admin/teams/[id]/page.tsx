import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminTeamDetailsView } from "@/components/sections/admin/teams/details";
import { getAdminTeamById } from "@/mock/AdminTeams";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((id) => ({ id: String(id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const team = getAdminTeamById(Number(id));

  return {
    title: team ? `TeamUp — ${team.displayTitle}` : "TeamUp — Team Details",
  };
}

export default async function AdminTeamDetailsPage({ params }: Props) {
  const { id } = await params;
  const team = getAdminTeamById(Number(id));

  if (!team) return notFound();

  return <AdminTeamDetailsView team={team} />;
}