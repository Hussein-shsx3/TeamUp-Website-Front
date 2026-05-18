"use client";

import api from "@/lib/axios";
import type { MessageResponse } from "@/types/auth";
import type {
  ProfileCompletionResponse,
  SingleUserResponse,
  UpdateMePayload,
} from "@/types/user";

const USER_BASE_PATH = "/users";

export const userService = {
  async getMe() {
    const { data } = await api.get<SingleUserResponse>(`${USER_BASE_PATH}/me`);
    return data;
  },

  async getProfileCompletion() {
    const { data } = await api.get<ProfileCompletionResponse>(
      `${USER_BASE_PATH}/me/completion-score`,
    );
    return data;
  },

  async updateMe(payload: UpdateMePayload) {
    const { data } = await api.patch<SingleUserResponse>(
      `${USER_BASE_PATH}/me`,
      payload,
    );

    return data;
  },

  async updateProfilePicture(formData: FormData) {
    const { data } = await api.patch<SingleUserResponse>(
      `${USER_BASE_PATH}/me/profile-picture`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return data;
  },

  async getUserById(id: string) {
    const { data } = await api.get<SingleUserResponse>(`${USER_BASE_PATH}/${id}`);
    return data;
  },

  async getUserActivity(id: string) {
    const { data } = await api.get<MessageResponse>(`${USER_BASE_PATH}/${id}/activity`);
    return data;
  },
};
