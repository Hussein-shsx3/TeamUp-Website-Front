import type { UserRole } from "./Dashboard";

// ── Team Work Space (mock until API + Socket.IO) ─────────────────────────────

export type WorkspaceView = "lead" | "member";

const LEAD_ROLES: UserRole[] = ["team_admin", "mentor"];

/** Lead = mentor / team admin (can add tasks, files, meetings, settings). */
export function resolveWorkspaceView(
  userRole: UserRole,
  viewParam?: string | null,
): WorkspaceView {
  if (viewParam === "member") return "member";
  if (viewParam === "lead") return "lead";
  return LEAD_ROLES.includes(userRole) ? "lead" : "member";
}

export const WORKSPACE_PROJECT_DESCRIPTION =
  "This graduation project explores innovative solutions in [Industry Name], focusing on solving real-world challenges through research and practical implementation. The team will deliver documentation, prototypes, and a final presentation aligned with academic requirements.";
