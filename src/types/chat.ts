export interface ChatUserPreview {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string | null;
}

export interface ChatConversation {
  id: string;
  teamId: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  messagesCount: number;
  lastMessage: ChatMessageRecord | null;
}

export interface ChatMessageRecord {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
  sender: ChatUserPreview;
}

export interface ChatsListResponse {
  success: boolean;
  message: string;
  results: number;
  chats: ChatConversation[];
}

export interface ChatMessagesListResponse {
  success: boolean;
  message: string;
  results: number;
  messages: ChatMessageRecord[];
}

export interface CreateChatResponse {
  success: boolean;
  message: string;
  chat: ChatConversation;
}

export interface SendMessageResponse {
  success: boolean;
  message: string;
  data: ChatMessageRecord;
}