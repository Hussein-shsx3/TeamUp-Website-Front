import type { UserRole } from "./Dashboard";

// ── Team Work Space (mock until API + Socket.IO) ─────────────────────────────

export type WorkspaceView = "lead" | "member";

const LEAD_ROLES: UserRole[] = ["team_admin", "mentor"];

/** Lead = mentor / team admin (can add tasks, files, meetings, settings). */
export function resolveWorkspaceView(
  userRole: UserRole,
  viewParam?: string | null,
): WorkspaceView {
  if (viewParam === "member") return "member";
  if (viewParam === "lead") return "lead";
  return LEAD_ROLES.includes(userRole) ? "lead" : "member";
}

export const WORKSPACE_PROJECT_DESCRIPTION =
  "This graduation project explores innovative solutions in [Industry Name], focusing on solving real-world challenges through research and practical implementation. The team will deliver documentation, prototypes, and a final presentation aligned with academic requirements.";

export interface MockWorkspaceMember {
  id: number;
  name: string;
  role: string;
  isTeamAdmin: boolean;
  avatar: string;
}

export const MOCK_WORKSPACE_MEMBERS: MockWorkspaceMember[] = [
  {
    id: 1,
    name: "Student Name",
    role: "Team Admin · Role",
    isTeamAdmin: true,
    avatar: "/images/user.jpg",
  },
  {
    id: 2,
    name: "Student Name",
    role: "Role",
    isTeamAdmin: false,
    avatar: "/images/user.jpg",
  },
  {
    id: 3,
    name: "Student Name",
    role: "Role",
    isTeamAdmin: false,
    avatar: "/images/user.jpg",
  },
  {
    id: 4,
    name: "Student Name",
    role: "Role",
    isTeamAdmin: false,
    avatar: "/images/user.jpg",
  },
  {
    id: 5,
    name: "Mentor Name",
    role: "Mentor",
    isTeamAdmin: false,
    avatar: "/images/user.jpg",
  },
];

export interface MockWorkspaceTask {
  id: number;
  title: string;
  assignee: string;
  due: string;
  done: boolean;
}

export const MOCK_WORKSPACE_TASKS: MockWorkspaceTask[] = [
  {
    id: 1,
    title: "Design ui for web",
    assignee: "Student name",
    due: "Due 20 Dec",
    done: false,
  },
  {
    id: 2,
    title: "Design ui for web",
    assignee: "Student name",
    due: "Due 20 Dec",
    done: false,
  },
  {
    id: 3,
    title: "Design ui for web",
    assignee: "Student name",
    due: "Due 20 Dec",
    done: true,
  },
  {
    id: 4,
    title: "Design ui for web",
    assignee: "Student name",
    due: "Due 20 Dec",
    done: false,
  },
];

export interface MockWorkspaceFile {
  id: number;
  name: string;
  uploadedBy: string;
  sizeLabel: string;
}

export const MOCK_WORKSPACE_FILES: MockWorkspaceFile[] = [
  {
    id: 1,
    name: "File Name",
    uploadedBy: "student name",
    sizeLabel: "2.4 mb",
  },
  {
    id: 2,
    name: "File Name",
    uploadedBy: "student name",
    sizeLabel: "2.4 mb",
  },
  {
    id: 3,
    name: "File Name",
    uploadedBy: "student name",
    sizeLabel: "2.4 mb",
  },
];

export interface MockWorkspaceMeeting {
  id: number;
  title: string;
  dateLabel: string;
  timeLabel: string;
}

export const MOCK_WORKSPACE_MEETINGS: MockWorkspaceMeeting[] = [
  {
    id: 1,
    title: "Meeting Title",
    dateLabel: "24 Oct",
    timeLabel: "7:00pm",
  },
  {
    id: 2,
    title: "Meeting Title",
    dateLabel: "24 Oct",
    timeLabel: "7:00pm",
  },
];

export type MockChatAuthor = "me" | "other";

export interface MockWorkspaceChatMessage {
  id: number;
  author: MockChatAuthor;
  /** Shown above bubble for incoming messages */
  senderName?: string;
  body: string;
  time: string;
}

export const MOCK_WORKSPACE_CHAT_MESSAGES: MockWorkspaceChatMessage[] = [
  {
    id: 1,
    author: "other",
    senderName: "Student Name",
    body: "Hi team, please review the latest wireframes when you can.",
    time: "10:12 AM",
  },
  {
    id: 2,
    author: "other",
    senderName: "Mentor Name",
    body: "Looks good — let’s align on the navigation flow in tomorrow’s call.",
    time: "10:18 AM",
  },
  {
    id: 3,
    author: "me",
    body: "Shared an updated Figma link in Shared Files.",
    time: "10:22 AM",
  },
];

export const MOCK_WORKSPACE_ONLINE_COUNT = 4;
