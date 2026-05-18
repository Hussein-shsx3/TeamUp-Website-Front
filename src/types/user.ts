import type { UserRole } from "@/types/auth";

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  isVerified: boolean;
  universityId: string | null;
  collegeId: string | null;
  departmentId: string | null;
  profilePictureUrl: string | null;
  bio: string | null;
  phone: string | null;
  academicProfile?: {
    major: string | null;
    skills: string[];
  } | null;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SingleUserResponse {
  success: boolean;
  message: string;
  user: UserProfile;
}

export interface ProfileCompletionResponse {
  success: boolean;
  message: string;
  score: number;
  completedFields: number;
  totalFields: number;
  missingFields: string[];
}

export interface UpdateMePayload {
  username?: string;
  firstName?: string;
  lastName?: string;
  bio?: string | null;
  phone?: string | null;
  major?: string | null;
  skills?: string[];
  profilePictureUrl?: string | null;
  universityId?: string | null;
  collegeId?: string | null;
  departmentId?: string | null;
}
