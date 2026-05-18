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
  avatar: "/images/user.png",
};

export const ADMIN_STATS: AdminStatCard[] = [
  { label: "Total Users", value: "2,576", tone: "primary", icon: "users" },
  { label: "Pending Users", value: "18", tone: "warning", icon: "pending-users" },
  { label: "Active Projects", value: "75", tone: "info", icon: "projects" },
  { label: "Completed Projects", value: "65", tone: "success", icon: "completed" },
  { label: "Pending Ideas", value: "18", tone: "danger", icon: "ideas" },
];

export const ADMIN_GROWTH_MONTHLY: AdminGrowthPoint[] = [
  { label: "W1", users: 3, projects: 4 },
  { label: "W2", users: 6, projects: 6 },
  { label: "W3", users: 9, projects: 7 },
  { label: "W4", users: 5, projects: 3 },
];

export const ADMIN_GROWTH_YEARLY: AdminGrowthPoint[] = [
  { label: "JAN", users: 8, projects: 6 },
  { label: "FEB", users: 10, projects: 7 },
  { label: "MAR", users: 13, projects: 9 },
  { label: "APR", users: 15, projects: 11 },
  { label: "MAY", users: 18, projects: 14 },
  { label: "JUN", users: 20, projects: 15 },
  { label: "JUL", users: 23, projects: 17 },
  { label: "AUG", users: 25, projects: 18 },
  { label: "SEP", users: 27, projects: 20 },
  { label: "OCT", users: 28, projects: 21 },
  { label: "NOV", users: 29, projects: 21 },
  { label: "DEC", users: 30, projects: 22 },
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
    title: "AI-Powered Team Matching",
    submittedBy: "Wafaa Amjad",
    status: "Pending",
    date: "2 days ago",
    selected: false,
  },
  {
    id: 2,
    title: "Mobile App for Mentorship",
    submittedBy: "Wafaa Amjad",
    status: "Pending",
    date: "2 days ago",
    selected: true,
  },
  {
    id: 3,
    title: "Real-time Collaboration Features",
    submittedBy: "Wafaa Amjad",
    status: "Approved",
    date: "2 days ago",
    selected: true,
  },
  {
    id: 4,
    title: "Advanced Analytics Dashboard",
    submittedBy: "Wafaa Amjad",
    status: "Rejected",
    date: "2 days ago",
    selected: false,
  },
  {
    id: 5,
    title: "Video Interview Integration",
    submittedBy: "Wafaa Amjad",
    status: "Rejected",
    date: "2 days ago",
    selected: false,
  },
  {
    id: 6,
    title: "Social Media Integration",
    submittedBy: "Ahmed Hassan",
    status: "Approved",
    date: "1 day ago",
    selected: false,
  },
  {
    id: 7,
    title: "Project Recommendations Engine",
    submittedBy: "Fatima Khan",
    status: "Pending",
    date: "3 days ago",
    selected: true,
  },
  {
    id: 8,
    title: "Skill Assessment Tool",
    submittedBy: "Mohammad Ali",
    status: "Approved",
    date: "4 days ago",
    selected: false,
  },
  {
    id: 9,
    title: "Gamification System",
    submittedBy: "Sara Ahmed",
    status: "Pending",
    date: "1 day ago",
    selected: false,
  },
  {
    id: 10,
    title: "Notification Center",
    submittedBy: "Omar Ibrahim",
    status: "Rejected",
    date: "5 days ago",
    selected: true,
  },
  {
    id: 11,
    title: "Budget Tracking Module",
    submittedBy: "Layla Samir",
    status: "Approved",
    date: "3 days ago",
    selected: false,
  },
  {
    id: 12,
    title: "Custom Workflows",
    submittedBy: "Hassan Mahdi",
    status: "Pending",
    date: "2 days ago",
    selected: true,
  },
];

export const ADMIN_QUICK_ACTIONS: AdminQuickAction[] = [
  { label: "Approve Users", href: "/admin/users", icon: "users" },
  { label: "Manage Teams", href: "/admin/teams", icon: "teams" },
  { label: "Review Project Ideas", href: "/admin/project-ideas", icon: "ideas" },
  { label: "Open Settings", href: "/admin/settings", icon: "settings" },
];
