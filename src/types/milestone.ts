export interface MilestoneUserPreview {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string | null;
}

export interface MilestoneRecord {
  id: string;
  teamId: string;
  projectId: string;
  title: string;
  description: string | null;
  status: string;
  dueDate: string | null;
  submittedAt: string | null;
  reviewedBy: string | null;
  reviewNotes: string | null;
  createdAt: string;
  updatedAt: string;
  reviewer: MilestoneUserPreview | null;
}

export interface MilestonesListResponse {
  success: boolean;
  message: string;
  results: number;
  milestones: MilestoneRecord[];
}

export interface MilestoneDetailsResponse {
  success: boolean;
  message: string;
  milestone: MilestoneRecord;
}