// ── Dashboard mock data ──────────────────────────────────────────────────────

export type UserRole = "student" | "graduate" | "team_admin" | "mentor";

export const MOCK_USER = {
  name: "Wafaa Amjad",
  role: "UI/UX Designer",
  userRole: "team_admin" as UserRole,
  avatar: "/images/Group 2.png",
  skills: ["UI design", "Ux design", "web design", "mobile design"],
  hasTeam: true,
  profileCompletion: 80,
  university: "AlAzhar",
  major: "Software Engineering",
  bio: "UI/UX Design student dedicated to creating user-centric digital experiences. I combine empathy with data-driven design to build intuitive interfaces. Skilled in Figma, Adobe XD, and visual storytelling. Ready to bring creative ideas to life!",
};

/* A different student profile (for viewing someone else's page) */
export const MOCK_STUDENT_PROFILE = {
  id: 42,
  name: "Wafaa Amjad",
  displayRole: "Student",
  avatar: "/images/Group 2.png",
  skills: ["UI design", "Ux design", "web design", "mobile design"],
  university: "AlAzhar",
  major: "Software Engineering",
  bio: "UI/UX Design student dedicated to creating user-centric digital experiences. I combine empathy with data-driven design to build intuitive interfaces. Skilled in Figma, Adobe XD, and visual storytelling. Ready to bring creative ideas to life!",
};

export const MOCK_PROJECT = {
  name: "Project Name",
  supervisor: "Dr. Name",
  status: "In Progress" as const,
  completion: 70,
  teamMembers: [
    { id: 1, name: "Alice", avatar: "/images/Group 2.png" },
    { id: 2, name: "Bob", avatar: "/images/Group 2.png" },
    { id: 3, name: "Carol", avatar: "/images/Group 2.png" },
  ],
  extraMembers: 2,
};

export const MOCK_MILESTONES = [
  {
    id: 1,
    title: "Proposal Approval",
    status: "completed" as const,
    date: "4 Des 2025",
  },
  {
    id: 2,
    title: "Proposal Approval",
    status: "completed" as const,
    date: "4 Des 2025",
  },
  {
    id: 3,
    title: "Proposal Approval",
    status: "in-progress" as const,
    date: "Targe 30 Des 2025",
  },
  {
    id: 4,
    title: "Proposal Approval",
    status: "scheduled" as const,
    date: "Scheduled for Feb",
  },
];

export const MOCK_TASKS = [
  { id: 1, title: "Design ui for web", due: "Due 20 Dec", done: false },
  { id: 2, title: "Design ui for web", due: "Due 20 Dec", done: false },
  { id: 3, title: "Design ui for web", due: "Due 20 Dec", done: false },
  { id: 4, title: "Design ui for web", due: "Due 20 Dec", done: false },
];

export const MOCK_ACTIVITIES = [
  { id: 1, actor: "Admin Name", action: "Add New Task", time: "2 min ago" },
  { id: 2, actor: "Admin Name", action: "Add New Task", time: "2 min ago" },
  { id: 3, actor: "Admin Name", action: "Add New Task", time: "2 min ago" },
  { id: 4, actor: "Admin Name", action: "Add New Task", time: "2 min ago" },
  { id: 5, actor: "Admin Name", action: "Add New Task", time: "2 min ago" },
];

export const DASHBOARD_NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Find a team", href: "/dashboard/find-team" },
  { label: "Projects Ideas", href: "/dashboard/projects-ideas" },
];

/** Main dashboard “Go to project workspace” → Team Work Space page. */
export const TEAM_WORKSPACE_HREF = "/dashboard/workspace";

/** Settings area — sidebar labels and routes (mock). */
export const MOCK_PROFILE_DISPLAY_ROLE = "Student";

export const SETTINGS_NAV_LINKS = [
  {
    id: "profile" as const,
    label: "Profile",
    href: "/dashboard/settings/profile",
  },
  {
    id: "account" as const,
    label: "Account & Security",
    href: "/dashboard/settings/account",
  },
  {
    id: "notifications" as const,
    label: "Notifications",
    href: "/dashboard/settings/notifications",
  },
];

/** Account & Security settings form (mock). */
export const MOCK_ACCOUNT_SECURITY = {
  studentId: "20218378",
  password: "8458489",
  email: "Example@gmail.com",
  profileVisibility: "all",
};

export const PROFILE_VISIBILITY_OPTIONS = [
  { value: "", label: "Select" },
  { value: "all", label: "All" },
  { value: "teams_applied", label: "Teams that applied to join" },
  { value: "registered_only", label: "Registered students only" },
];

/** Notifications settings — initial checkbox states (mock). */
export const MOCK_NOTIFICATION_SETTINGS = {
  inApp: {
    joinRequests: true,
    invitations: false,
    teamMessages: true,
    taskUpdates: true,
    mentorUpdates: true,
    deadlines: true,
  },
  email: {
    platformEmail: true,
    weeklyDigest: false,
    securityAlerts: true,
  },
};

// ── Recommended projects (no-team view) ──────────────────────────────────────
export interface MockRecommendedProject {
  id: number;
  name: string;
  description: string;
  tags: string[];
  image: string;
}

export const MOCK_RECOMMENDED_PROJECTS: MockRecommendedProject[] = [
  {
    id: 1,
    name: "Project Name",
    description:
      "This graduation project explores innovative solutions in [Industry Name], focusing on solving real-world challenges through research and practical implementation.",
    tags: ["Ui design", "Ui design"],
    image: "/images/Group 2.png",
  },
  {
    id: 2,
    name: "Project Name",
    description:
      "This graduation project explores innovative solutions in [Industry Name], focusing on solving real-world challenges through research and practical implementation.",
    tags: ["Ui design", "Ui design"],
    image: "/images/Group 2.png",
  },
  {
    id: 3,
    name: "Project Name",
    description:
      "This graduation project explores innovative solutions in [Industry Name], focusing on solving real-world challenges through research and practical implementation.",
    tags: ["Ui design", "Ui design"],
    image: "/images/Group 2.png",
  },
];

// ── Notification types ────────────────────────────────────────────────────────
export type NotificationType = "team" | "feedback" | "task" | "system";

export interface MockNotification {
  id: number;
  type: NotificationType;
  title: string;
  body: string;
  time: string;
  read: boolean;
  emoji: string;
}

export const MOCK_NOTIFICATIONS: MockNotification[] = [
  {
    id: 1,
    type: "team",
    title: "Request Accepted! 🎉",
    body: 'Great news! You have been accepted to join the "Smart Campus" team. You can now access the team dashboard and start collaborating.',
    time: "2 min ago",
    read: false,
    emoji: "🎉",
  },
  {
    id: 2,
    type: "feedback",
    title: "New Feedback from Mentor 🦉",
    body: 'Dr. Sarah left a new comment on your "Phase 1 Report". Please review the feedback and update your tasks.',
    time: "15 min ago",
    read: false,
    emoji: "🦉",
  },
  {
    id: 3,
    type: "task",
    title: "Task Assigned to You 📌",
    body: 'A new task "Design Login Wireframes" has been assigned to you by the team leader. Deadline: Tomorrow, 10:00 PM.',
    time: "1 hr ago",
    read: false,
    emoji: "📌",
  },
  {
    id: 4,
    type: "system",
    title: "Project Deadline Reminder ⏰",
    body: "Your project submission deadline is in 3 days. Make sure all tasks are completed and submitted on time.",
    time: "3 hr ago",
    read: true,
    emoji: "⏰",
  },
  {
    id: 5,
    type: "team",
    title: "New Team Member Joined 👋",
    body: 'Ahmed Hassan has joined your project team "Smart Campus" as a Backend Developer.',
    time: "Yesterday",
    read: true,
    emoji: "👋",
  },
];

// ── Calendar mock events ──────────────────────────────────────────────────────
export interface MockCalendarEvent {
  id: number;
  title: string;
  time: string;
  type: "meeting" | "deadline" | "session";
}

export interface MockCalendarDay {
  date: number; // day of month
  month: number; // 0-indexed
  year: number;
  events: MockCalendarEvent[];
}

export const MOCK_CALENDAR_EVENTS: Record<string, MockCalendarEvent[]> = {
  "2026-07-10": [
    {
      id: 1,
      title: "Mentor Feedback Session",
      time: "2:00 pm – 2:30 pm",
      type: "session",
    },
    {
      id: 2,
      title: "Deadline: UI/UX Wireframes",
      time: "9:00 pm",
      type: "deadline",
    },
  ],
  "2026-07-15": [
    {
      id: 3,
      title: "Team Standup",
      time: "10:00 am – 10:30 am",
      type: "meeting",
    },
  ],
  "2026-07-19": [
    {
      id: 4,
      title: "Project Review",
      time: "3:00 pm – 4:00 pm",
      type: "meeting",
    },
  ],
  "2026-07-22": [
    {
      id: 5,
      title: "Supervisor Meeting",
      time: "11:00 am",
      type: "session",
    },
  ],
};
