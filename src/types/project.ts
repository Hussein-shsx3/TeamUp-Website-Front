export interface ProjectCreatorPreview {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string | null;
}

export interface ProjectDetail {
  id: string;
  projectId: string;
  detailedDescription: string | null;
  implementationGuide: string | null;
  deliverables: string[];
  documentationUrl: string | null;
}

export interface ProjectFile {
  id: string;
  projectId: string;
  fileName: string;
  fileUrl: string;
  fileType: string | null;
  fileSize: string | null;
  uploadedBy: string;
  createdAt: string;
}

export interface ProjectRecord {
  id: string;
  title: string;
  summary: string;
  description: string | null;
  status: string;
  ideaType: string;
  price: number;
  createdById: string;
  universityId: string | null;
  collegeId: string | null;
  departmentId: string | null;
  technologies: string[];
  requiredSkills: string[];
  isPublished: boolean;
  isApproved: boolean;
  viewsCount: number;
  savesCount: number;
  purchaseCount: number;
  createdAt: string;
  updatedAt: string;
  creator: ProjectCreatorPreview;
  details: ProjectDetail | null;
  files: ProjectFile[];
  filesCount?: number;
}

export interface ProjectsListResponse {
  success: boolean;
  message: string;
  results: number;
  projects: ProjectRecord[];
}

export interface ProjectDetailsResponse {
  success: boolean;
  message: string;
  project: ProjectRecord;
}

export interface ProjectFilesResponse {
  success: boolean;
  message: string;
  results: number;
  files: ProjectFile[];
}

export interface SavedProjectRecord extends ProjectRecord {
  savedAt: string;
  detailsHidden?: boolean;
}

export interface SavedProjectsResponse {
  success: boolean;
  message: string;
  results: number;
  projects: SavedProjectRecord[];
}