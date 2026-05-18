"use client";

import api from "@/lib/axios";
import type { TasksListResponse, TaskDetailsResponse } from "@/types/task";

const TASK_BASE_PATH = "/tasks";

type TaskQueryValue = string | number | boolean | undefined;

const buildQueryString = (query?: Record<string, TaskQueryValue>) => {
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

export const taskService = {
  async getTasks(query?: Record<string, TaskQueryValue>) {
    const { data } = await api.get<TasksListResponse>(
      `${TASK_BASE_PATH}${buildQueryString(query)}`,
    );

    return data;
  },

  async getTaskById(id: string) {
    const { data } = await api.get<TaskDetailsResponse>(`${TASK_BASE_PATH}/${id}`);

    return data;
  },
};