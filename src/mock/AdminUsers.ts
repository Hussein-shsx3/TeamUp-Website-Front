export type AdminUserStatus = "Pending" | "Active" | "Blocked";
export type AdminUserRole = "Student" | "Mentor" | "Graduate";
export type AdminUserAction = "approve" | "warn" | "reject" | "disable" | "enable";
export type AdminUsersStatusFilter = "All" | AdminUserStatus;
export type AdminUsersRoleFilter = "All" | AdminUserRole;

export interface AdminUserRecord {
  id: number;
  name: string;
  email: string;
  status: AdminUserStatus;
  role: AdminUserRole;
  joinedAt: string;
  selected: boolean;
  avatar: string;
}

export interface AdminUserDetailRecord extends AdminUserRecord {
  university: string;
  major: string;
  bio: string;
  joinedTeam: string;
  skills: string[];
  areaOfExpertise?: string;
  activeProjects?: number;
  completedProjects?: number;
  supervisedProjects?: AdminUserSupervisedProjectRecord[];
  postedIdeas?: AdminUserPostedIdeaRecord[];
}

export interface AdminUserSupervisedProjectRecord {
  teamName: string;
  status: "Completed" | "In Progress";
  members: string[];
  selected: boolean;
}

export interface AdminUserPostedIdeaRecord {
  title: string;
  status: "Pending" | "Approved" | "Rejected";
  date: string;
  selected: boolean;
}

const ADMIN_USER_NAMES = [
  "Wafaa Amjad",
  "Ahmed Hassan",
  "Fatima Khan",
  "Mohammad Ali",
  "Sara Ahmed",
  "Omar Ibrahim",
  "Layla Samir",
  "Hassan Mahdi",
  "Yara Adel",
  "Noor Salem",
  "Alaa Mostafa",
  "Mona Adel",
  "Kareem Adel",
  "Salma Nabil",
  "Youssef Fathy",
  "Rana Tarek",
  "Huda Saeed",
  "Omar Nasser",
  "Dina Sherif",
  "Tamer Ashraf",
  "Lina Farouk",
  "Ziad Hamdi",
  "Reem Youssef",
  "Moustafa Hossam",
  "Nouran Khaled",
  "Khaled Mahmoud",
  "Hana Ali",
  "Feras Mahmoud",
  "Aya Samir",
  "Mahmoud Adel",
];

const ADMIN_USER_ROLES: AdminUserRole[] = [
  "Student",
  "Mentor",
  "Graduate",
  "Student",
  "Mentor",
  "Graduate",
];

const ADMIN_USER_STATUSES: AdminUserStatus[] = [
  "Pending",
  "Active",
  "Active",
  "Blocked",
  "Active",
  "Pending",
  "Active",
  "Blocked",
];

const ADMIN_USER_SELECTED_IDS = new Set([2, 3, 7, 11]);

const slugifyEmail = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.|\.$/g, "");

const buildJoinDate = (index: number) => {
  const date = new Date(Date.UTC(2026, 2, index + 1));
  return date.toISOString();
};

export const ADMIN_USERS: AdminUserRecord[] = ADMIN_USER_NAMES.map((name, index) => ({
  id: index + 1,
  name,
  email: `${slugifyEmail(name)}@teamup.edu`,
  status: ADMIN_USER_STATUSES[index % ADMIN_USER_STATUSES.length],
  role: ADMIN_USER_ROLES[index % ADMIN_USER_ROLES.length],
  joinedAt: buildJoinDate(index),
  selected: ADMIN_USER_SELECTED_IDS.has(index + 1),
  avatar: "/images/user.png",
}));

const buildStudentDetails = (record: AdminUserRecord): AdminUserDetailRecord => ({
  ...record,
  email: "Example@gmail.com",
  joinedAt: new Date(Date.UTC(2026, 2, 20)).toISOString(),
  status: "Active",
  university: "AlAzhar",
  major: "Software Engineering",
  bio: "UI/UX Design student dedicated to creating user-centric digital experiences. I combine empathy with data-driven design to build intuitive interfaces. Skilled in Figma, Adobe XD, and visual storytelling. Ready to bring creative ideas to life!",
  joinedTeam: "Software Engineering",
  skills: ["Ui design", "Ux design", "web design", "mobile design"],
});

const buildMentorDetails = (record: AdminUserRecord): AdminUserDetailRecord => ({
  ...record,
  email: record.email,
  university: "AlAzhar",
  major: "Senior Product Designer",
  bio: "Experienced mentor focused on guiding teams through product strategy, interface design, and project delivery.",
  joinedTeam: "Mentor Program",
  skills: ["Fundraising", "System Design", "Full-stack Dev", "Business Scaling"],
  areaOfExpertise: "UI/UX Design",
  activeProjects: 5,
  completedProjects: 7,
  supervisedProjects: Array.from({ length: 12 }, (_, index) => {
    const projectNumber = index + 1;
    return {
      teamName: `Team Project ${projectNumber}`,
      status: projectNumber % 3 === 0 ? "Completed" : "In Progress",
      members: ["SA", "WA", "AA", "LA"],
      selected: projectNumber % 4 === 0,
    } as const;
  }),
  postedIdeas: Array.from({ length: 8 }, (_, index) => {
    const ideaNumber = index + 1;
    const status: AdminUserPostedIdeaRecord["status"] =
      ideaNumber % 3 === 0 ? "Rejected" : ideaNumber % 2 === 0 ? "Approved" : "Pending";

    return {
      title: `Idea Title ${ideaNumber}`,
      status,
      date: "2 days ago",
      selected: ideaNumber % 2 === 0,
    } as const;
  }),
});

const buildGraduateDetails = (record: AdminUserRecord): AdminUserDetailRecord => ({
  ...record,
  email: record.email,
  university: "AlAzhar",
  major: "Software Engineering",
  bio: "Graduate focused on shipping polished academic projects and preparing for product roles.",
  joinedTeam: "Graduate Cohort",
  skills: ["UI design", "UX research", "Prototyping", "Web design"],
  areaOfExpertise: "Product Design",
  postedIdeas: [
    { title: "Idea Title", status: "Pending", date: "2 days ago", selected: false },
    { title: "Idea Title", status: "Pending", date: "2 days ago", selected: false },
    { title: "Idea Title", status: "Approved", date: "2 days ago", selected: true },
    { title: "Idea Title", status: "Rejected", date: "2 days ago", selected: true },
    { title: "Idea Title", status: "Rejected", date: "2 days ago", selected: false },
  ],
});

export const ADMIN_USER_DETAILS: AdminUserDetailRecord[] = ADMIN_USERS.map((record) => {
  if (record.id === 1) return buildStudentDetails(record);
  if (record.role === "Mentor") return buildMentorDetails(record);
  if (record.role === "Graduate") return buildGraduateDetails(record);
  return buildStudentDetails(record);
});

export const getAdminUserDetailById = (id: number) =>
  ADMIN_USER_DETAILS.find((user) => user.id === id) ?? null;

export const ADMIN_USERS_PAGE_SIZE_OPTIONS = [12, 24, 36] as const;
export const ADMIN_USERS_STATUS_FILTERS: AdminUsersStatusFilter[] = [
  "All",
  "Pending",
  "Active",
  "Blocked",
];
export const ADMIN_USERS_ROLE_FILTERS: AdminUsersRoleFilter[] = [
  "All",
  "Student",
  "Mentor",
  "Graduate",
];
