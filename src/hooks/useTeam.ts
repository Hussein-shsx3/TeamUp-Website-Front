import { useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useWorkspaceProject } from "@/hooks/useProject";
import { chatService } from "@/services/chat.service";
import { milestoneService } from "@/services/milestone.service";
import { meetingService } from "@/services/meeting.service";
import { projectService } from "@/services/project.service";
import { taskService } from "@/services/task.service";
import { teamService } from "@/services/team.service";
import type { ChatMessageRecord } from "@/types/chat";
import type { MilestoneRecord } from "@/types/milestone";
import type { MeetingRecord } from "@/types/meeting";
import type { ProjectFile } from "@/types/project";
import type { TaskRecord } from "@/types/task";
import type { WorkspaceTeamMember } from "@/types/team";

export const teamQueryKeys = {
  workspaceTeams: (projectId?: string) => ["teams", "workspace", projectId ?? "anonymous"] as const,
  workspaceMembers: (teamId?: string) => ["teams", "workspace-members", teamId ?? "anonymous"] as const,
};

const formatRole = (role?: string | null) => {
  if (!role) {
    return "Member";
  }

  return role
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

export const useWorkspaceTeam = () => {
  const { currentUserQuery, workspaceProjectQuery, workspaceProject } = useWorkspaceProject();
  const projectId = workspaceProject?.id;

  const workspaceTeamsQuery = useQuery({
    queryKey: teamQueryKeys.workspaceTeams(projectId),
    queryFn: () => teamService.getTeams({ projectId }),
    enabled: Boolean(projectId),
  });

  const workspaceTeam = workspaceTeamsQuery.data?.teams?.[0] ?? null;
  const teamId = workspaceTeam?.id;

  const workspaceTeamMembersQuery = useQuery({
    queryKey: teamQueryKeys.workspaceMembers(teamId),
    queryFn: () => teamService.getTeamMembers(teamId as string),
    enabled: Boolean(teamId),
  });

  const workspaceTeamMembers: WorkspaceTeamMember[] =
    workspaceTeamMembersQuery.data?.members.map((member) => {
      const displayName =
        [member.user?.firstName, member.user?.lastName].filter(Boolean).join(" ") ||
        member.user?.username ||
        "Team member";

      return {
        id: member.id,
        userId: member.userId,
        name: displayName,
        role: member.role === "TEAM_ADMIN" ? "Team Admin" : formatRole(member.user?.role),
        avatar: member.user?.profilePictureUrl ?? "/images/user.png",
        isTeamAdmin: member.role === "TEAM_ADMIN",
      };
    }) ?? [];

  return {
    currentUserQuery,
    workspaceProjectQuery,
    workspaceProject,
    workspaceTeamsQuery,
    workspaceTeam,
    workspaceTeamMembersQuery,
    workspaceTeamMembers,
  };
};

export interface WorkspaceTaskItem {
  id: string;
  title: string;
  assignee: string;
  due: string;
  done: boolean;
}

export interface WorkspaceMilestoneItem {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "scheduled";
  date: string;
}

export interface WorkspaceFileItem {
  id: string;
  name: string;
  uploadedBy: string;
  linkUrl: string;
  sizeLabel: string;
}

export interface WorkspaceMeetingItem {
  id: string;
  title: string;
  dateLabel: string;
  timeLabel: string;
}

export interface WorkspaceChatMessageItem {
  id: string;
  author: "me" | "other";
  senderName?: string;
  body: string;
  time: string;
}

const mapTask = (task: TaskRecord): WorkspaceTaskItem => ({
  id: task.id,
  title: task.title,
  assignee:
    [task.assignee?.firstName, task.assignee?.lastName].filter(Boolean).join(" ") ||
    task.assignee?.username ||
    "Unassigned",
  due: task.dueDate ? new Date(task.dueDate).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "No due date",
  done: task.status === "DONE" || task.status === "APPROVED",
});

const mapMilestone = (milestone: MilestoneRecord): WorkspaceMilestoneItem => {
  const statusMap: Record<string, WorkspaceMilestoneItem["status"]> = {
    PENDING: "scheduled",
    APPROVED: "completed",
    NEEDS_REVISION: "in-progress",
    REJECTED: "scheduled",
  };

  return {
    id: milestone.id,
    title: milestone.title,
    status: statusMap[milestone.status] ?? "scheduled",
    date: milestone.dueDate
      ? new Date(milestone.dueDate).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "No due date",
  };
};

export const useWorkspaceTasks = () => {
  const { workspaceTeam } = useWorkspaceTeam();
  const teamId = workspaceTeam?.id;

  const workspaceTasksQuery = useQuery({
    queryKey: ["tasks", "workspace", teamId ?? "anonymous"],
    queryFn: () => taskService.getTasks({ teamId }),
    enabled: Boolean(teamId),
  });

  const workspaceTasks = workspaceTasksQuery.data?.tasks.map(mapTask) ?? [];

  return {
    workspaceTasksQuery,
    workspaceTasks,
  };
};

export const useWorkspaceMilestones = () => {
  const { workspaceTeam, workspaceProject } = useWorkspaceTeam();
  const teamId = workspaceTeam?.id;
  const projectId = workspaceProject?.id;

  const workspaceMilestonesQuery = useQuery({
    queryKey: ["milestones", "workspace", teamId ?? projectId ?? "anonymous"],
    queryFn: () => milestoneService.getMilestones({ teamId, projectId }),
    enabled: Boolean(teamId && projectId),
  });

  const workspaceMilestones = workspaceMilestonesQuery.data?.milestones.map(mapMilestone) ?? [];

  return {
    workspaceMilestonesQuery,
    workspaceMilestones,
  };
};

const formatCompactDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric" });

const formatClockTime = (value: string) =>
  new Date(value).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

const formatSizeLabel = (fileSize: string | null) => {
  const size = Number(fileSize ?? 0);

  if (!Number.isFinite(size) || size <= 0) {
    return "0 b";
  }

  if (size < 1024) return `${size} b`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} kb`;
  return `${(size / (1024 * 1024)).toFixed(1)} mb`;
};

export const useWorkspaceFiles = (
  projectId?: string | null,
  members: WorkspaceTeamMember[] = [],
) => {
  const memberLookup = new Map(members.map((member) => [member.userId, member.name]));

  const workspaceFilesQuery = useQuery({
    queryKey: ["projects", "files", projectId ?? "anonymous"],
    queryFn: () => projectService.getProjectFiles(projectId as string),
    enabled: Boolean(projectId),
  });

  const workspaceFiles: WorkspaceFileItem[] =
    workspaceFilesQuery.data?.files.map((file) => ({
      id: file.id,
      name: file.fileName,
      uploadedBy: memberLookup.get(file.uploadedBy) ?? file.uploadedBy,
      linkUrl: file.fileUrl,
      sizeLabel: formatSizeLabel(file.fileSize),
    })) ?? [];

  return {
    workspaceFilesQuery,
    workspaceFiles,
  };
};

export const useWorkspaceMeetings = (teamId?: string | null) => {
  const workspaceMeetingsQuery = useQuery({
    queryKey: ["meetings", "workspace", teamId ?? "anonymous"],
    queryFn: () => meetingService.getMeetings({ teamId, upcoming: true }),
    enabled: Boolean(teamId),
  });

  const workspaceMeetings: WorkspaceMeetingItem[] =
    workspaceMeetingsQuery.data?.meetings.map((meeting: MeetingRecord) => ({
      id: meeting.id,
      title: meeting.title,
      dateLabel: formatCompactDate(meeting.startAt),
      timeLabel: `${formatClockTime(meeting.startAt)} - ${formatClockTime(meeting.endAt)}`,
    })) ?? [];

  return {
    workspaceMeetingsQuery,
    workspaceMeetings,
  };
};

export const useWorkspaceChat = (
  teamId?: string | null,
  currentUserId?: string | null,
) => {
  const queryClient = useQueryClient();
  const createChatRequestedRef = useRef(false);

  const teamChatsQuery = useQuery({
    queryKey: ["chats", "workspace", teamId ?? "anonymous"],
    queryFn: () => chatService.getTeamChats(teamId as string),
    enabled: Boolean(teamId),
  });

  const chatId = teamChatsQuery.data?.chats[0]?.id ?? null;

  const chatMessagesQuery = useQuery({
    queryKey: ["chats", "messages", chatId ?? "anonymous"],
    queryFn: () => chatService.getChatMessages(chatId as string),
    enabled: Boolean(chatId),
  });

  const createChatMutation = useMutation({
    mutationFn: () => chatService.createChat(teamId as string),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["chats", "workspace", teamId ?? "anonymous"],
      });
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: (content: string) => chatService.sendMessage(chatId as string, content),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["chats", "messages", chatId ?? "anonymous"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["chats", "workspace", teamId ?? "anonymous"],
        }),
      ]);
    },
  });

  useEffect(() => {
    createChatRequestedRef.current = false;
  }, [teamId]);

  useEffect(() => {
    if (!teamId || createChatRequestedRef.current) {
      return;
    }

    if (!teamChatsQuery.isFetched || (teamChatsQuery.data?.chats.length ?? 0) > 0) {
      return;
    }

    createChatRequestedRef.current = true;
    createChatMutation.mutate();
  }, [createChatMutation, teamChatsQuery.data?.chats.length, teamChatsQuery.isFetched, teamId]);

  const workspaceChatMessages: WorkspaceChatMessageItem[] =
    chatMessagesQuery.data?.messages.map((message: ChatMessageRecord) => ({
      id: message.id,
      author: message.senderId === currentUserId ? "me" : "other",
      senderName:
        [message.sender.firstName, message.sender.lastName].filter(Boolean).join(" ") ||
        message.sender.username,
      body: message.content,
      time: formatClockTime(message.createdAt),
    })) ?? [];

  return {
    teamChatsQuery,
    chatMessagesQuery,
    chatId,
    workspaceChatMessages,
    isCreatingChat: createChatMutation.isPending,
    isSendingMessage: sendMessageMutation.isPending,
    sendMessage: sendMessageMutation.mutateAsync,
  };
};