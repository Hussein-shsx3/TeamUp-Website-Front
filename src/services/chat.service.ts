"use client";

import api from "@/lib/axios";
import type {
  ChatMessagesListResponse,
  ChatsListResponse,
  CreateChatResponse,
  SendMessageResponse,
} from "@/types/chat";

const CHAT_BASE_PATH = "/chats";

type ChatQueryValue = string | number | boolean | undefined;

const buildQueryString = (query?: Record<string, ChatQueryValue>) => {
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

export const chatService = {
  async createChat(teamId: string) {
    const { data } = await api.post<CreateChatResponse>(CHAT_BASE_PATH, {
      teamId,
      type: "TEAM",
    });

    return data;
  },

  async getTeamChats(teamId: string) {
    const { data } = await api.get<ChatsListResponse>(
      `${CHAT_BASE_PATH}/team/${teamId}`,
    );

    return data;
  },

  async getChatMessages(chatId: string, query?: Record<string, ChatQueryValue>) {
    const { data } = await api.get<ChatMessagesListResponse>(
      `${CHAT_BASE_PATH}/${chatId}/messages${buildQueryString(query)}`,
    );

    return data;
  },

  async sendMessage(chatId: string, content: string) {
    const { data } = await api.post<SendMessageResponse>(
      `${CHAT_BASE_PATH}/${chatId}/messages`,
      { content },
    );

    return data;
  },
};