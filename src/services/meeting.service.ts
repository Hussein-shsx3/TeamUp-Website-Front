"use client";

import api from "@/lib/axios";
import type { MeetingsListResponse } from "@/types/meeting";

const MEETING_BASE_PATH = "/meetings";

type MeetingQueryValue = string | number | boolean | undefined;

const buildQueryString = (query?: Record<string, MeetingQueryValue>) => {
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

export const meetingService = {
  async getMeetings(query?: Record<string, MeetingQueryValue>) {
    const { data } = await api.get<MeetingsListResponse>(
      `${MEETING_BASE_PATH}${buildQueryString(query)}`,
    );

    return data;
  },
};