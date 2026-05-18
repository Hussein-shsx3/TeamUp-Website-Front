export interface TeamUserPreview {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  profilePictureUrl: string | null;
}

export interface TeamMemberRecord {
  id: string;
  userId: string;
  teamId: string;
  role: string;
  status: string;
  joinedAt: string;
  user?: TeamUserPreview;
}

export interface TeamRecord {
  id: string;
  name: string;
  description: string | null;
  projectId: string | null;
  mentorId: string | null;
  status: string;
  maxMembers: number;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeamDetailsResponse {
  success: boolean;
  message: string;
  team: TeamRecord & {
    members: TeamMemberRecord[];
    mentor: TeamUserPreview | null;
  };
}

export interface TeamsListResponse {
  success: boolean;
  message: string;
  results: number;
  teams: TeamRecord[];
}

export interface TeamMembersResponse {
  success: boolean;
  message: string;
  results: number;
  members: TeamMemberRecord[];
}

export interface WorkspaceTeamMember {
  id: string;
  userId: string;
  name: string;
  role: string;
  avatar: string;
  isTeamAdmin: boolean;
}