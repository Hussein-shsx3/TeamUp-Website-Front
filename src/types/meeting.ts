export interface MeetingUserPreview {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string | null;
}

export interface MeetingRecord {
  id: string;
  teamId: string;
  createdById: string;
  title: string;
  description: string | null;
  meetingUrl: string | null;
  location: string | null;
  status: string;
  startAt: string;
  endAt: string;
  createdAt: string;
  updatedAt: string;
  creator: MeetingUserPreview;
}

export interface MeetingsListResponse {
  success: boolean;
  message: string;
  results: number;
  meetings: MeetingRecord[];
}