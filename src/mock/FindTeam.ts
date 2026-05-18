// ── Find a Team — shared option lists ────────────────────────────────────────

export type TeamStatus = "Hiring" | "Full" | "Invite Only";
export type ProjectCategory =
  | "Software"
  | "Design"
  | "AI / ML"
  | "Cybersecurity"
  | "Data Science"
  | "Networking"
  | "Mobile"
  | "Research";

export const FIND_TEAM_SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "best_match", label: "Best Match" },
];

export const FIND_TEAM_CATEGORY_OPTIONS = [
  { value: "", label: "Select" },
  { value: "Software", label: "Software" },
  { value: "Design", label: "Design" },
  { value: "AI / ML", label: "AI / ML" },
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "Data Science", label: "Data Science" },
  { value: "Networking", label: "Networking" },
  { value: "Mobile", label: "Mobile" },
  { value: "Research", label: "Research" },
];

export const FIND_TEAM_ROLE_OPTIONS = [
  { value: "", label: "Select" },
  { value: "UI design", label: "UI design" },
  { value: "Strategy", label: "Strategy" },
  { value: "Backend", label: "Backend" },
  { value: "Frontend", label: "Frontend" },
  { value: "Mobile Dev", label: "Mobile Dev" },
  { value: "Data Analysis", label: "Data Analysis" },
];

export const FIND_TEAM_STATUS_OPTIONS = [
  { value: "", label: "All" },
  { value: "Hiring", label: "Hiring" },
  { value: "Full", label: "Full" },
  { value: "Invite Only", label: "Invite Only" },
];
