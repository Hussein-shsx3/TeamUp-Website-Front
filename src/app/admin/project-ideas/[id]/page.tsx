import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdminProjectIdeaById } from "@/mock/ProjectsIdeas";
import { AdminProjectIdeaDetailsView } from "@/components/sections/admin/projectIdeas/details";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const idea = getAdminProjectIdeaById(Number(id));

  return {
    title: idea ? `TeamUp — ${idea.displayTitle}` : "TeamUp — Idea Details",
  };
}

export async function generateStaticParams() {
  const { ADMIN_PROJECT_IDEAS } = await import("@/mock/ProjectsIdeas");
  return ADMIN_PROJECT_IDEAS.map((idea) => ({ id: String(idea.id) }));
}

export default async function AdminProjectIdeaDetailsPage({ params }: Props) {
  const { id } = await params;
  const idea = getAdminProjectIdeaById(Number(id));

  if (!idea) return notFound();

  return <AdminProjectIdeaDetailsView idea={idea} />;
}