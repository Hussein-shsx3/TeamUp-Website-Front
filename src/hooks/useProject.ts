import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/useUser";
import { projectService } from "@/services/project.service";

export interface RecommendedProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

export const projectQueryKeys = {
  workspace: (userId?: string) => ["projects", "workspace", userId ?? "anonymous"] as const,
};

export const useWorkspaceProject = () => {
  const currentUserQuery = useCurrentUser();
  const userId = currentUserQuery.data?.user.id;

  const workspaceProjectQuery = useQuery({
    queryKey: projectQueryKeys.workspace(userId),
    queryFn: () => projectService.getProjects({ createdById: userId }),
    enabled: Boolean(userId),
  });

  const workspaceProject = workspaceProjectQuery.data?.projects?.[0] ?? null;

  return {
    currentUserQuery,
    workspaceProjectQuery,
    workspaceProject,
  };
};

export const useRecommendedProjects = () => {
  const recommendedProjectsQuery = useQuery({
    queryKey: ["projects", "recommended"],
    queryFn: () =>
      projectService.getProjects({ isPublished: true, status: "PUBLISHED" }),
  });

  const recommendedProjects: RecommendedProjectItem[] =
    recommendedProjectsQuery.data?.projects.slice(0, 3).map((project) => ({
      id: project.id,
      title: project.title,
      description: project.summary,
      tags: project.requiredSkills.slice(0, 2),
      image: "/images/Team.jpg",
    })) ?? [];

  return {
    recommendedProjectsQuery,
    recommendedProjects,
  };
};