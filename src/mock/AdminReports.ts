export type AdminReportStatus = "New" | "In Review" | "Resolved" | "Rejected";

export interface AdminReportRecord {
  id: number;
  teamName: string;
  reportTitle: string;
  reportedBy: string;
  reportedByEmail: string;
  reportedByRole: string;
  reportedByAvatar: string;
  status: AdminReportStatus;
  date: string;
  selected: boolean;
}

export interface AdminReportDetailRecord extends AdminReportRecord {
  displayTitle: string;
  description: string;
  sendingDateLabel: string;
  profileStatus: string;
  profileHref: string;
}

export const ADMIN_REPORT_STATUS_FILTERS: Array<"All" | AdminReportStatus> = [
  "All",
  "New",
  "In Review",
  "Resolved",
  "Rejected",
];

export const ADMIN_REPORT_PAGE_SIZE_OPTIONS = [12, 24, 36];

export const ADMIN_REPORTS: AdminReportRecord[] = [
  {
    id: 1,
    teamName: "Team name",
    reportTitle: "Report Title",
    reportedBy: "Wafaa Amjad",
    reportedByEmail: "wafaa.amjad@example.com",
    reportedByRole: "Student",
    reportedByAvatar: "/images/user.jpg",
    status: "New",
    date: "2 days ago",
    selected: false,
  },
  {
    id: 2,
    teamName: "Team name",
    reportTitle: "Report Title",
    reportedBy: "Wafaa Amjad",
    reportedByEmail: "wafaa.amjad@example.com",
    reportedByRole: "Student",
    reportedByAvatar: "/images/user.jpg",
    status: "In Review",
    date: "2 days ago",
    selected: true,
  },
  {
    id: 3,
    teamName: "Team name",
    reportTitle: "Report Title",
    reportedBy: "Wafaa Amjad",
    reportedByEmail: "wafaa.amjad@example.com",
    reportedByRole: "Student",
    reportedByAvatar: "/images/user.jpg",
    status: "In Review",
    date: "2 days ago",
    selected: true,
  },
  {
    id: 4,
    teamName: "Team name",
    reportTitle: "Report Title",
    reportedBy: "Wafaa Amjad",
    reportedByEmail: "wafaa.amjad@example.com",
    reportedByRole: "Student",
    reportedByAvatar: "/images/user.jpg",
    status: "Resolved",
    date: "2 days ago",
    selected: false,
  },
  {
    id: 5,
    teamName: "Team name",
    reportTitle: "Report Title",
    reportedBy: "Wafaa Amjad",
    reportedByEmail: "wafaa.amjad@example.com",
    reportedByRole: "Student",
    reportedByAvatar: "/images/user.jpg",
    status: "Resolved",
    date: "2 days ago",
    selected: false,
  },
  {
    id: 6,
    teamName: "Team name",
    reportTitle: "Report Title",
    reportedBy: "Wafaa Amjad",
    reportedByEmail: "wafaa.amjad@example.com",
    reportedByRole: "Student",
    reportedByAvatar: "/images/user.jpg",
    status: "Resolved",
    date: "2 days ago",
    selected: false,
  },
  {
    id: 7,
    teamName: "Team name",
    reportTitle: "Report Title",
    reportedBy: "Wafaa Amjad",
    reportedByEmail: "wafaa.amjad@example.com",
    reportedByRole: "Student",
    reportedByAvatar: "/images/user.jpg",
    status: "New",
    date: "2 days ago",
    selected: false,
  },
  {
    id: 8,
    teamName: "Team name",
    reportTitle: "Report Title",
    reportedBy: "Wafaa Amjad",
    reportedByEmail: "wafaa.amjad@example.com",
    reportedByRole: "Student",
    reportedByAvatar: "/images/user.jpg",
    status: "Rejected",
    date: "2 days ago",
    selected: false,
  },
  {
    id: 9,
    teamName: "Team name",
    reportTitle: "Report Title",
    reportedBy: "Wafaa Amjad",
    reportedByEmail: "wafaa.amjad@example.com",
    reportedByRole: "Student",
    reportedByAvatar: "/images/user.jpg",
    status: "Rejected",
    date: "2 days ago",
    selected: false,
  },
  {
    id: 10,
    teamName: "Team name",
    reportTitle: "Report Title",
    reportedBy: "Wafaa Amjad",
    reportedByEmail: "wafaa.amjad@example.com",
    reportedByRole: "Student",
    reportedByAvatar: "/images/user.jpg",
    status: "Resolved",
    date: "2 days ago",
    selected: false,
  },
  {
    id: 11,
    teamName: "Team name",
    reportTitle: "Report Title",
    reportedBy: "Wafaa Amjad",
    reportedByEmail: "wafaa.amjad@example.com",
    reportedByRole: "Student",
    reportedByAvatar: "/images/user.jpg",
    status: "New",
    date: "2 days ago",
    selected: false,
  },
  {
    id: 12,
    teamName: "Team name",
    reportTitle: "Report Title",
    reportedBy: "Wafaa Amjad",
    reportedByEmail: "wafaa.amjad@example.com",
    reportedByRole: "Student",
    reportedByAvatar: "/images/user.jpg",
    status: "New",
    date: "2 days ago",
    selected: false,
  },
];

export const ADMIN_REPORT_DETAILS: AdminReportDetailRecord[] = ADMIN_REPORTS.map((report) => ({
  ...report,
  displayTitle: report.reportTitle,
  description:
    "UI/UX Design student dedicated to creating user-centric digital experiences. I combine empathy with data-driven design to build intuitive interfaces. Skilled in Figma, Adobe XD, and visual storytelling. Ready to bring creative ideas to life!",
  sendingDateLabel: "Mar.20.2026",
  profileStatus: "Student",
  profileHref: "/admin/users/1",
}));

export const getAdminReportById = (id: number) =>
  ADMIN_REPORT_DETAILS.find((report) => report.id === id) ?? null;