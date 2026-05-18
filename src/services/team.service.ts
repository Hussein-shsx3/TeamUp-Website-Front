"use client";

import api from "@/lib/axios";
import type {
  TeamDetailsResponse,
  TeamMembersResponse,
  TeamsListResponse,
} from "@/types/team";

const TEAM_BASE_PATH = "/teams";

type TeamQueryValue = string | number | boolean | undefined;

const buildQueryString = (query?: Record<string, TeamQueryValue>) => {
  const searchParams = new URLSearchParams();

  if (!query) {
    return "";
  }

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    searchParams.set(key, String(value));
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
};

export const teamService = {
  async getTeams(query?: Record<string, TeamQueryValue>) {
    const { data } = await api.get<TeamsListResponse>(
      `${TEAM_BASE_PATH}${buildQueryString(query)}`,
    );

    return data;
  },

  async getTeamById(id: string) {
    const { data } = await api.get<TeamDetailsResponse>(`${TEAM_BASE_PATH}/${id}`);

    return data;
  },

  async getTeamMembers(id: string) {
    const { data } = await api.get<TeamMembersResponse>(
      `${TEAM_BASE_PATH}/${id}/members`,
    );

    return data;
  },
};