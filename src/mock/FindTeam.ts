// ── Find a Team — mock data ──────────────────────────────────────────────────

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

export interface FindTeamProject {
  id: number;
  name: string;
  description: string;
  image: string;
  teamCapacity: number;
  currentMembers: number;
  lookingFor: string[];
  category: ProjectCategory;
  status: TeamStatus;
  university: string;
}

export const FIND_TEAM_PROJECTS: FindTeamProject[] = [
  {
    id: 1,
    name: "Project Name",
    description:
      "This graduation project explores innovative solutions in [Industry Name], focusing on solving real-world challenges through research and practical implementation.",
    image: "/images/Team.jpg",
    teamCapacity: 5,
    currentMembers: 3,
    lookingFor: ["UI design", "Strategy", "UI design"],
    category: "Design",
    status: "Hiring",
    university: "AlAzhar",
  },
  {
    id: 2,
    name: "Project Name",
    description:
      "This graduation project explores innovative solutions in [Industry Name], focusing on solving real-world challenges through research and practical implementation.",
    image: "/images/Team.jpg",
    teamCapacity: 4,
    currentMembers: 2,
    lookingFor: ["UI design", "UI design"],
    category: "Software",
    status: "Hiring",
    university: "AlAzhar",
  },
  {
    id: 3,
    name: "Project Name",
    description:
      "This graduation project explores innovative solutions in [Industry Name], focusing on solving real-world challenges through research and practical implementation.",
    image: "/images/Team.jpg",
    teamCapacity: 6,
    currentMembers: 4,
    lookingFor: ["UI design", "Strategy"],
    category: "AI / ML",
    status: "Hiring",
    university: "AlAzhar",
  },
  {
    id: 4,
    name: "Project Name",
    description:
      "This graduation project explores innovative solutions in [Industry Name], focusing on solving real-world challenges through research and practical implementation.",
    image: "/images/Team.jpg",
    teamCapacity: 5,
    currentMembers: 5,
    lookingFor: ["UI design"],
    category: "Mobile",
    status: "Full",
    university: "AlAzhar",
  },
  {
    id: 5,
    name: "Project Name",
    description:
      "This graduation project explores innovative solutions in [Industry Name], focusing on solving real-world challenges through research and practical implementation.",
    image: "/images/Team.jpg",
    teamCapacity: 4,
    currentMembers: 3,
    lookingFor: ["UI design", "Strategy"],
    category: "Cybersecurity",
    status: "Hiring",
    university: "AlAzhar",
  },
  {
    id: 6,
    name: "Project Name",
    description:
      "This graduation project explores innovative solutions in [Industry Name], focusing on solving real-world challenges through research and practical implementation.",
    image: "/images/Team.jpg",
    teamCapacity: 5,
    currentMembers: 2,
    lookingFor: ["UI design", "UI design"],
    category: "Data Science",
    status: "Hiring",
    university: "AlAzhar",
  },
  {
    id: 7,
    name: "Project Name",
    description:
      "This graduation project explores innovative solutions in [Industry Name], focusing on solving real-world challenges through research and practical implementation.",
    image: "/images/Team.jpg",
    teamCapacity: 3,
    currentMembers: 1,
    lookingFor: ["Strategy", "UI design"],
    category: "Research",
    status: "Invite Only",
    university: "AlAzhar",
  },
  {
    id: 8,
    name: "Project Name",
    description:
      "This graduation project explores innovative solutions in [Industry Name], focusing on solving real-world challenges through research and practical implementation.",
    image: "/images/Team.jpg",
    teamCapacity: 5,
    currentMembers: 4,
    lookingFor: ["UI design"],
    category: "Networking",
    status: "Hiring",
    university: "AlAzhar",
  },
  {
    id: 9,
    name: "Project Name",
    description:
      "This graduation project explores innovative solutions in [Industry Name], focusing on solving real-world challenges through research and practical implementation.",
    image: "/images/Team.jpg",
    teamCapacity: 4,
    currentMembers: 3,
    lookingFor: ["UI design", "Strategy", "UI design"],
    category: "Software",
    status: "Hiring",
    university: "AlAzhar",
  },
];

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
