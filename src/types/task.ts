export interface TaskUserPreview {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string | null;
}

export interface TaskRecord {
  id: string;
  teamId: string;
  title: string;
  description: string | null;
  status: string;
  assignedTo: string | null;
  dueDate: string | null;
  priority: number;
  createdAt: string;
  updatedAt: string;
  assignee: TaskUserPreview | null;
}

export interface TasksListResponse {
  success: boolean;
  message: string;
  results: number;
  tasks: TaskRecord[];
}

export interface TaskDetailsResponse {
  success: boolean;
  message: string;
  task: TaskRecord;
}