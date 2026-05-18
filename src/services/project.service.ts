"use client";

import api from "@/lib/axios";
import type {
  ProjectDetailsResponse,
  ProjectFilesResponse,
  SavedProjectsResponse,
  ProjectsListResponse,
} from "@/types/project";

const PROJECT_BASE_PATH = "/projects";

type ProjectQueryValue = string | number | boolean | undefined;

const buildQueryString = (query?: Record<string, ProjectQueryValue>) => {
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

export const projectService = {
  async getProjects(query?: Record<string, ProjectQueryValue>) {
    const { data } = await api.get<ProjectsListResponse>(
      `${PROJECT_BASE_PATH}${buildQueryString(query)}`,
    );

    return data;
  },

  async getProjectById(id: string) {
    const { data } = await api.get<ProjectDetailsResponse>(
      `${PROJECT_BASE_PATH}/${id}`,
    );

    return data;
  },

  async getProjectFiles(id: string) {
    const { data } = await api.get<ProjectFilesResponse>(
      `${PROJECT_BASE_PATH}/${id}/files`,
    );

    return data;
  },

  async getSavedProjects() {
    const { data } = await api.get<SavedProjectsResponse>(
      `${PROJECT_BASE_PATH}/saved`,
    );

    return data;
  },
};