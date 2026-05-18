"use client";

import api from "@/lib/axios";
import type {
  MilestonesListResponse,
  MilestoneDetailsResponse,
} from "@/types/milestone";

const MILESTONE_BASE_PATH = "/milestones";

type MilestoneQueryValue = string | number | boolean | undefined;

const buildQueryString = (query?: Record<string, MilestoneQueryValue>) => {
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

export const milestoneService = {
  async getMilestones(query?: Record<string, MilestoneQueryValue>) {
    const { data } = await api.get<MilestonesListResponse>(
      `${MILESTONE_BASE_PATH}${buildQueryString(query)}`,
    );

    return data;
  },

  async getMilestoneById(id: string) {
    const { data } = await api.get<MilestoneDetailsResponse>(
      `${MILESTONE_BASE_PATH}/${id}`,
    );

    return data;
  },
};