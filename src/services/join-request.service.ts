"use client";

import api from "@/lib/axios";

const JOIN_REQUEST_BASE_PATH = "/join-requests";

export interface CreateJoinRequestPayload {
  teamId: string;
  coverLetter?: string;
}

export interface JoinRequestResponse {
  success: boolean;
  message: string;
  request: {
    id: string;
    teamId: string;
    userId: string;
    coverLetter: string | null;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: string;
    updatedAt: string;
    respondedAt: string | null;
  };
}

export const joinRequestService = {
  async createRequest(payload: CreateJoinRequestPayload) {
    const { data } = await api.post<JoinRequestResponse>(
      JOIN_REQUEST_BASE_PATH,
      payload,
    );

    return data;
  },
};