export type AdminTeamStatus = "Completed" | "In Progress" | "Pending" | "Rejected" | "Disabled";

export interface AdminTeamMember {
  name: string;
  avatar: string;
}

export interface AdminTeamMemberRow {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  role: string;
  joinDate: string;
  avatar: string;
}

export interface AdminTeamReportRecord {
  id: number;
  teamName: string;
  reportTitle: string;
  teamMentor: string;
  teamMentorAvatar: string | null;
  status: AdminTeamStatus;
  members: AdminTeamMember[];
  selected: boolean;
}

export interface AdminTeamDetailRecord extends AdminTeamReportRecord {
  displayTitle: string;
  description: string;
  techStack: string[];
  rolesNeeded: string[];
  completion: number;
  mentorRole: string;
  mentorStatus: string;
  mentorHref: string;
  mentorAvatar: string;
  membersCountLabel: string;
  postedAtLabel: string;
  membersTable: AdminTeamMemberRow[];
}

const buildMembers = (label: string): AdminTeamMember[] =>
  Array.from({ length: 5 }, (_, index) => ({
    name: `${label} Member ${index + 1}`,
    avatar: "/images/user.jpg",
  }));

export const ADMIN_TEAM_STATUS_FILTERS: Array<"All" | AdminTeamStatus> = [
  "All",
  "Completed",
  "In Progress",
  "Pending",
  "Rejected",
  "Disabled",
];

export const ADMIN_TEAM_PAGE_SIZE_OPTIONS = [12, 24, 36];

export const ADMIN_TEAM_REPORTS: AdminTeamReportRecord[] = [
  {
    id: 1,
    teamName: "Team name",
    reportTitle: "Smart Campus Energy Audit",
    teamMentor: "Wafaa Amjad",
    teamMentorAvatar: "/images/user.jpg",
    status: "Completed",
    members: buildMembers("Alpha"),
    selected: false,
  },
  {
    id: 2,
    teamName: "Team name",
    reportTitle: "AI Attendance Tracking Report",
    teamMentor: "Wafaa Amjad",
    teamMentorAvatar: "/images/user.jpg",
    status: "In Progress",
    members: buildMembers("Beta"),
    selected: true,
  },
  {
    id: 3,
    teamName: "Team name",
    reportTitle: "Graduation Project Progress Report",
    teamMentor: "Wafaa Amjad",
    teamMentorAvatar: "/images/user.jpg",
    status: "In Progress",
    members: buildMembers("Gamma"),
    selected: true,
  },
  {
    id: 4,
    teamName: "Team name",
    reportTitle: "Student Feedback Review Report",
    teamMentor: "Wafaa Amjad",
    teamMentorAvatar: "/images/user.jpg",
    status: "Completed",
    members: buildMembers("Delta"),
    selected: false,
  },
  {
    id: 5,
    teamName: "Team name",
    reportTitle: "Mentor Supervision Summary",
    teamMentor: "Wafaa Amjad",
    teamMentorAvatar: "/images/user.jpg",
    status: "Pending",
    members: buildMembers("Epsilon"),
    selected: false,
  },
  {
    id: 6,
    teamName: "Team name",
    reportTitle: "Weekly Collaboration Check-in",
    teamMentor: "Not Assigned",
    teamMentorAvatar: null,
    status: "Completed",
    members: buildMembers("Zeta"),
    selected: false,
  },
  {
    id: 7,
    teamName: "Team name",
    reportTitle: "Mobile App Delivery Report",
    teamMentor: "Wafaa Amjad",
    teamMentorAvatar: "/images/user.jpg",
    status: "Completed",
    members: buildMembers("Eta"),
    selected: false,
  },
  {
    id: 8,
    teamName: "Team name",
    reportTitle: "Security Review Report",
    teamMentor: "Not Assigned",
    teamMentorAvatar: null,
    status: "Pending",
    members: buildMembers("Theta"),
    selected: false,
  },
  {
    id: 9,
    teamName: "Team name",
    reportTitle: "Requirements Validation Report",
    teamMentor: "Wafaa Amjad",
    teamMentorAvatar: "/images/user.jpg",
    status: "Pending",
    members: buildMembers("Iota"),
    selected: false,
  },
  {
    id: 10,
    teamName: "Team name",
    reportTitle: "Final Demo Readiness Report",
    teamMentor: "Not Assigned",
    teamMentorAvatar: null,
    status: "In Progress",
    members: buildMembers("Kappa"),
    selected: false,
  },
  {
    id: 11,
    teamName: "Team name",
    reportTitle: "UI Prototype Review Report",
    teamMentor: "Wafaa Amjad",
    teamMentorAvatar: "/images/user.jpg",
    status: "In Progress",
    members: buildMembers("Lambda"),
    selected: false,
  },
  {
    id: 12,
    teamName: "Team name",
    reportTitle: "Team Performance Summary",
    teamMentor: "Wafaa Amjad",
    teamMentorAvatar: "/images/user.jpg",
    status: "Completed",
    members: buildMembers("Mu"),
    selected: false,
  },
];

export const ADMIN_TEAM_DETAILS: AdminTeamDetailRecord[] = ADMIN_TEAM_REPORTS.map((team) => ({
  ...team,
  displayTitle: team.teamName,
  description:
    "An IoT-based solution designed to monitor and optimize electricity consumption across university facilities. The system uses real-time sensors to control lighting and AC units, providing a comprehensive dashboard for administrators to reduce carbon footprint.",
  techStack: ["ui design", "ui design", "ui design", "ui design"],
  rolesNeeded: ["ui design", "ui design"],
  completion: 70,
  mentorRole: "Mentor",
  mentorStatus: "Active",
  mentorHref: "/admin/users/1",
  mentorAvatar: "/images/user.jpg",
  membersCountLabel: "4/5 members",
  postedAtLabel: "Mar. 23. 2026",
  membersTable: [
    {
      id: 1,
      name: "Wafaa Amjad",
      email: "wafaa.amjad@example.com",
      status: "Active",
      role: "Team Admin",
      joinDate: "Mar. 23. 2026",
      avatar: "/images/user.jpg",
    },
    {
      id: 2,
      name: "Ahmed Hassan",
      email: "ahmed.hassan@example.com",
      status: "Active",
      role: "UI/UX Designer",
      joinDate: "Mar. 23. 2026",
      avatar: "/images/user.jpg",
    },
    {
      id: 3,
      name: "Fatima Noor",
      email: "fatima.noor@example.com",
      status: "Active",
      role: "Frontend Developer",
      joinDate: "Mar. 23. 2026",
      avatar: "/images/user.jpg",
    },
    {
      id: 4,
      name: "Omar Ibrahim",
      email: "omar.ibrahim@example.com",
      status: "Inactive",
      role: "Backend Developer",
      joinDate: "Mar. 23. 2026",
      avatar: "/images/user.jpg",
    },
  ],
}));

export const getAdminTeamById = (id: number) =>
  ADMIN_TEAM_DETAILS.find((team) => team.id === id) ?? null;