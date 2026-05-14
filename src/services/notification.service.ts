"use client";

import api from "@/lib/axios";
import type {
  MessageResponse,
  NotificationStatsResponse,
  NotificationsListResponse,
} from "@/types/notification";

const NOTIFICATION_BASE_PATH = "/notifications";

export const notificationService = {
  async getMyNotifications() {
    const { data } = await api.get<NotificationsListResponse>(NOTIFICATION_BASE_PATH);
    return data;
  },

  async getNotificationStats() {
    const { data } = await api.get<NotificationStatsResponse>(`${NOTIFICATION_BASE_PATH}/stats`);
    return data;
  },

  async markAsRead(id: string) {
    const { data } = await api.patch<MessageResponse>(`${NOTIFICATION_BASE_PATH}/${id}/read`);
    return data;
  },

  async markAllAsRead() {
    const { data } = await api.post<MessageResponse>(`${NOTIFICATION_BASE_PATH}/read-all`);
    return data;
  },

  async deleteNotification(id: string) {
    const { data } = await api.delete<MessageResponse>(`${NOTIFICATION_BASE_PATH}/${id}`);
    return data;
  },

  async deleteAllNotifications() {
    const { data } = await api.delete<MessageResponse>(NOTIFICATION_BASE_PATH);
    return data;
  },
};