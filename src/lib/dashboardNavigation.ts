import type { UserRole } from "@/types/auth";

export interface DashboardNavItem {
  label: string;
  href: string;
}

const STUDENT_NAV_ITEMS: DashboardNavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Find a team", href: "/dashboard/find-team" },
  { label: "Projects Ideas", href: "/dashboard/projects-ideas" },
];

const MENTOR_NAV_ITEMS: DashboardNavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Workspace", href: "/dashboard/workspace" },
  { label: "Projects Ideas", href: "/dashboard/projects-ideas" },
];

const GRADUATE_NAV_ITEMS: DashboardNavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Workspace", href: "/dashboard/workspace" },
  { label: "Find a team", href: "/dashboard/find-team" },
  { label: "Projects Ideas", href: "/dashboard/projects-ideas" },
];

export const getDashboardNavItems = (role?: UserRole | null) => {
  switch (role) {
    case "MENTOR":
      return MENTOR_NAV_ITEMS;
    case "GRADUATE":
      return GRADUATE_NAV_ITEMS;
    default:
      return STUDENT_NAV_ITEMS;
  }
};

export const getDashboardTitle = (role?: UserRole | null) => {
  switch (role) {
    case "MENTOR":
      return "Main Mentor Dashboard";
    case "GRADUATE":
      return "Main Graduate Dashboard";
    default:
      return "Main Student Dashboard";
  }
};

export const getDashboardWelcomeLabel = (role?: UserRole | null) => {
  switch (role) {
    case "MENTOR":
      return "Mentor Dashboard";
    case "GRADUATE":
      return "Graduate Dashboard";
    default:
      return "Student Dashboard";
  }
};