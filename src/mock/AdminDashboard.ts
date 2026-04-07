export type AdminNavItem = {
  label: string;
  href: string;
  icon: "dashboard" | "users" | "ideas" | "teams" | "reports" | "settings" | "logout";
};

export type AdminStatTone = "primary" | "warning" | "info" | "success" | "danger";

export interface AdminStatCard {
  label: string;
  value: string;
  tone: AdminStatTone;
  icon: "users" | "pending-users" | "projects" | "completed" | "ideas";
}

export interface AdminGrowthPoint {
  label: string;
  users: number;
  projects: number;
}

export interface AdminStatusSlice {
  label: string;
  value: number;
  color: string;
}

export type AdminIdeaStatus = "Pending" | "Approved" | "Rejected";

export interface AdminRecentIdea {
  id: number;
  title: string;
  submittedBy: string;
  status: AdminIdeaStatus;
  date: string;
  selected?: boolean;
}

export interface AdminQuickAction {
  label: string;
  href: string;
  icon: "users" | "teams" | "ideas" | "settings";
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Users", href: "/admin/users", icon: "users" },
  { label: "Project ideas", href: "/admin/project-ideas", icon: "ideas" },
  { label: "Teams", href: "/admin/teams", icon: "teams" },
  { label: "Reports", href: "/admin/reports", icon: "reports" },
  { label: "Settings", href: "/admin/settings", icon: "settings" },
  { label: "Logout", href: "/auth", icon: "logout" },
];

export const ADMIN_PROFILE = {
  name: "Wafaa Amjad",
  role: "UI/UX Designer",
  avatar: "/images/user.jpg",
};

export const ADMIN_STATS: AdminStatCard[] = [
  { label: "Total Users", value: "2,576", tone: "primary", icon: "users" },
  { label: "Pending Users", value: "18", tone: "warning", icon: "pending-users" },
  { label: "Active Projects", value: "75", tone: "info", icon: "projects" },
  { label: "Completed Projects", value: "65", tone: "success", icon: "completed" },
  { label: "Pending Ideas", value: "18", tone: "danger", icon: "ideas" },
];

export const ADMIN_GROWTH_MONTHLY: AdminGrowthPoint[] = [
  { label: "1", users: 3, projects: 4 },
  { label: "2", users: 4, projects: 5 },
  { label: "3", users: 5, projects: 5 },
  { label: "4", users: 6, projects: 6 },
  { label: "5", users: 8, projects: 7 },
  { label: "6", users: 10, projects: 7 },
  { label: "7", users: 11, projects: 6 },
  { label: "8", users: 12, projects: 5 },
  { label: "9", users: 11, projects: 5 },
  { label: "10", users: 9, projects: 4 },
  { label: "11", users: 7, projects: 4 },
  { label: "12", users: 6, projects: 3 },
  { label: "13", users: 5, projects: 3 },
  { label: "14", users: 6, projects: 4 },
  { label: "15", users: 7, projects: 5 },
  { label: "16", users: 8, projects: 6 },
  { label: "17", users: 9, projects: 7 },
  { label: "18", users: 10, projects: 7 },
  { label: "19", users: 11, projects: 8 },
  { label: "20", users: 10, projects: 8 },
  { label: "21", users: 9, projects: 7 },
  { label: "22", users: 8, projects: 6 },
  { label: "23", users: 7, projects: 5 },
  { label: "24", users: 6, projects: 5 },
  { label: "25", users: 5, projects: 4 },
  { label: "26", users: 4, projects: 4 },
  { label: "27", users: 4, projects: 3 },
  { label: "28", users: 3, projects: 3 },
  { label: "29", users: 3, projects: 2 },
  { label: "30", users: 2, projects: 2 },
];

export const ADMIN_GROWTH_YEARLY: AdminGrowthPoint[] = [
  { label: "2021", users: 8, projects: 6 },
  { label: "2022", users: 14, projects: 10 },
  { label: "2023", users: 19, projects: 15 },
  { label: "2024", users: 24, projects: 18 },
  { label: "2025", users: 30, projects: 22 },
];

export const ADMIN_GROWTH_SERIES = ADMIN_GROWTH_MONTHLY;

export const ADMIN_STATUS_BREAKDOWN: AdminStatusSlice[] = [
  { label: "Active", value: 40, color: "#3B82F6" },
  { label: "Pending", value: 25, color: "#10B981" },
  { label: "Completed", value: 35, color: "#1D4ED8" },
];

export const ADMIN_RECENT_IDEAS: AdminRecentIdea[] = [
  {
    id: 1,
    title: "Idea Title",
    submittedBy: "Wafaa Amjad",
    status: "Pending",
    date: "2 days ago",
    selected: false,
  },
  {
    id: 2,
    title: "Idea Title",
    submittedBy: "Wafaa Amjad",
    status: "Pending",
    date: "2 days ago",
    selected: true,
  },
  {
    id: 3,
    title: "Idea Title",
    submittedBy: "Wafaa Amjad",
    status: "Approved",
    date: "2 days ago",
    selected: true,
  },
  {
    id: 4,
    title: "Idea Title",
    submittedBy: "Wafaa Amjad",
    status: "Rejected",
    date: "2 days ago",
    selected: false,
  },
  {
    id: 5,
    title: "Idea Title",
    submittedBy: "Wafaa Amjad",
    status: "Rejected",
    date: "2 days ago",
    selected: false,
  },
];

export const ADMIN_QUICK_ACTIONS: AdminQuickAction[] = [
  { label: "Approve Users", href: "/admin/users", icon: "users" },
  { label: "Manage Teams", href: "/admin/teams", icon: "teams" },
  { label: "Review Project Ideas", href: "/admin/project-ideas", icon: "ideas" },
  { label: "Open Settings", href: "/admin/settings", icon: "settings" },
];
