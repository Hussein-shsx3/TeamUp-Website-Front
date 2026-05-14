export type NotificationType =
  | "JOIN_REQUEST_RECEIVED"
  | "JOIN_REQUEST_ACCEPTED"
  | "JOIN_REQUEST_REJECTED"
  | "TASK_ASSIGNED"
  | "TASK_COMPLETED"
  | "MILESTONE_STATUS_CHANGED"
  | "MEETING_REMINDER"
  | "MESSAGE_RECEIVED"
  | "PROJECT_APPROVED"
  | "PROJECT_REJECTED"
  | "MENTOR_INVITATION_SENT"
  | "MENTOR_INVITATION_ACCEPTED"
  | "MENTOR_INVITATION_REJECTED";

export interface NotificationResponse {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  content: string;
  relatedEntityId: string | null;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
}

export interface NotificationsListResponse {
  success: boolean;
  message: string;
  results: number;
  notifications: NotificationResponse[];
}

export interface NotificationStatsResponse {
  success: boolean;
  message: string;
  total: number;
  unread: number;
}

export interface MessageResponse {
  success: boolean;
  message: string;
}