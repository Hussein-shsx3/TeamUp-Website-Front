import { useMemo } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";
import { teamService } from "@/services/team.service";
import type { ProjectRecord } from "@/types/project";
import type { TeamMemberRecord, TeamRecord } from "@/types/team";

export type TeamStatus = "Hiring" | "Full" | "Invite Only";

export interface FindTeamMember {
  id: string;
  name: string;
  role: string;
  isAdmin: boolean;
  avatar: string;
}

export interface FindTeamProject {
  id: string;
  teamId: string;
  name: string;
  description: string;
  fullDescription: string;
  image: string;
  teamCapacity: number;
  currentMembers: number;
  lookingFor: string[];
  techStack: string[];
  category: string;
  status: TeamStatus;
  university: string;
  mentorName: string;
  supervisorName: string;
  postDate: string;
  members: FindTeamMember[];
}

const TEAM_IMAGES = ["/images/Team.jpg", "/images/team1.jpg"];

const pickTeamImage = (key: string) => {
  const hash = key
    .split("")
    .reduce((sum, character) => sum + character.charCodeAt(0), 0);

  return TEAM_IMAGES[hash % TEAM_IMAGES.length];
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const getDisplayName = (
  firstName?: string | null,
  lastName?: string | null,
  username?: string | null,
) => {
  return [firstName, lastName].filter(Boolean).join(" ") || username || "Team member";
};

const mapMember = (member: TeamMemberRecord): FindTeamMember => ({
  id: member.id,
  name: getDisplayName(
    member.user?.firstName,
    member.user?.lastName,
    member.user?.username,
  ),
  role: member.role === "TEAM_ADMIN" ? "Team Admin" : member.role,
  isAdmin: member.role === "TEAM_ADMIN",
  avatar: member.user?.profilePictureUrl ?? "/images/user.png",
});

const mapProject = (
  project: ProjectRecord,
  team?: TeamRecord | null,
  members: FindTeamMember[] = [],
): FindTeamProject => {
  const currentMembers = team?.memberCount ?? members.length;
  const teamCapacity = team?.maxMembers ?? 5;
  const status: TeamStatus =
    currentMembers >= teamCapacity
      ? "Full"
      : team?.status === "PUBLISHED"
        ? "Hiring"
        : "Invite Only";

  const creatorName = getDisplayName(
    project.creator.firstName,
    project.creator.lastName,
    project.creator.username,
  );

  return {
    id: project.id,
    teamId: team?.id ?? "",
    name: project.title,
    description: project.summary,
    fullDescription:
      project.details?.detailedDescription ?? project.description ?? project.summary,
    image: pickTeamImage(team?.id ?? project.id),
    teamCapacity,
    currentMembers,
    lookingFor: project.requiredSkills,
    techStack: project.technologies,
    category: project.ideaType,
    status,
    university: project.universityId ?? "",
    mentorName: creatorName,
    supervisorName: creatorName,
    postDate: formatDate(project.createdAt),
    members,
  };
};

export const useFindTeamProjects = () => {
  const teamsQuery = useQuery({
    queryKey: ["teams", "find-team"],
    queryFn: () => teamService.getTeams(),
  });

  const projectQueries = useQueries({
    queries:
      teamsQuery.data?.teams.map((team) => ({
        queryKey: ["projects", "find-team", team.projectId ?? team.id],
        queryFn: () => projectService.getProjectById(team.projectId as string),
        enabled: Boolean(team.projectId),
      })) ?? [],
  });

  const projects = useMemo(() => {
    return (
      teamsQuery.data?.teams.flatMap((team, index) => {
        const project = projectQueries[index]?.data?.project ?? null;

        if (!project) {
          return [];
        }

        return [mapProject(project, team, [])];
      }) ?? []
    );
  }, [projectQueries, teamsQuery.data?.teams]);

  return {
    projectsQuery: teamsQuery,
    projects,
  };
};

export const useFindTeamProject = (projectId: string) => {
  const projectQuery = useQuery({
    queryKey: ["projects", "find-team", projectId],
    queryFn: () => projectService.getProjectById(projectId),
    enabled: Boolean(projectId),
  });

  const teamListQuery = useQuery({
    queryKey: ["teams", "find-team", projectId],
    queryFn: () => teamService.getTeams({ projectId }),
    enabled: Boolean(projectId),
  });

  const teamId = teamListQuery.data?.teams?.[0]?.id ?? null;

  const teamDetailsQuery = useQuery({
    queryKey: ["teams", "find-team-details", teamId ?? "none"],
    queryFn: () => teamService.getTeamById(teamId as string),
    enabled: Boolean(teamId),
  });

  const teamMembers = useMemo(() => {
    if (!teamDetailsQuery.data?.team?.members) {
      return [] as FindTeamMember[];
    }

    return teamDetailsQuery.data.team.members.map(mapMember);
  }, [teamDetailsQuery.data?.team?.members]);

  const project = projectQuery.data?.project ?? null;
  const team = teamDetailsQuery.data?.team ?? null;

  return {
    projectQuery,
    teamListQuery,
    teamDetailsQuery,
    project: project ? mapProject(project, team, teamMembers) : null,
  };
};
