// ── Projects Ideas — mock data ───────────────────────────────────────────────

export type IdeaPrice = "free" | "paid";

export interface ProjectIdea {
  id: number;
  name: string;
  description: string;
  price: IdeaPrice;
  priceAmount?: number; // e.g. 5 — only when price === "paid"
  postedBy: string;
  mentorAvatar: string;
  postDate: string;
  category: string;
  difficultyLevel: string;
  timeFrame: string;
  techStack: string[];
  isSaved: boolean;
  image: string; // Project image/thumbnail
}

export type AdminProjectIdeaStatus = "Pending" | "Approved" | "Rejected";

export interface AdminProjectIdeaRecord extends ProjectIdea {
  submittedBy: string;
  status: AdminProjectIdeaStatus;
  postedAt: string;
  selected: boolean;
}

export interface AdminProjectIdeaDetailRecord extends AdminProjectIdeaRecord {
  displayTitle: string;
  displayDescription: string;
  displayCategory: string;
  displayDifficultyLevel: string;
  displayTimeFrame: string;
  displayTechStack: string[];
  authorName: string;
  authorRole: string;
  authorStatus: string;
  authorAvatar: string;
  authorHref: string;
  postedAtLabel: string;
}

const DESC =
  "This graduation project explores innovative solutions in [Industry Name], focusing on solving real-world challenges through research and practical implementation.";

export const PROJECTS_IDEAS: ProjectIdea[] = [
  {
    id: 1,
    name: "Project Name",
    description: DESC,
    price: "free",
    postedBy: "Dr Name",
    mentorAvatar: "/images/user.jpg",
    postDate: "12 . nov . 2025",
    category: "Design",
    difficultyLevel: "Intermediate",
    timeFrame: "3 - 4 Month",
    techStack: ["ui design", "ui design", "ui design", "ui design", "ui design"],
    isSaved: false,
    image: "/images/Team.jpg",
  },
  {
    id: 2,
    name: "Project Name",
    description: DESC,
    price: "paid",
    priceAmount: 5,
    postedBy: "Dr Name",
    mentorAvatar: "/images/user.jpg",
    postDate: "12 . nov . 2025",
    category: "Software",
    difficultyLevel: "Intermediate",
    timeFrame: "3 - 4 Month",
    techStack: ["ui design", "ui design", "ui design", "ui design", "ui design"],
    isSaved: false,
    image: "/images/Team.jpg",
  },
  {
    id: 3,
    name: "Project Name",
    description: DESC,
    price: "free",
    postedBy: "Dr Name",
    mentorAvatar: "/images/user.jpg",
    postDate: "12 . nov . 2025",
    category: "AI / ML",
    difficultyLevel: "Intermediate",
    timeFrame: "3 - 4 Month",
    techStack: ["ui design", "ui design", "ui design", "ui design", "ui design"],
    isSaved: true,
    image: "/images/Team.jpg",
  },
  {
    id: 4,
    name: "Project Name",
    description: DESC,
    price: "free",
    postedBy: "Dr Name",
    mentorAvatar: "/images/user.jpg",
    postDate: "12 . nov . 2025",
    category: "Mobile",
    difficultyLevel: "Intermediate",
    timeFrame: "3 - 4 Month",
    techStack: ["ui design", "ui design", "ui design", "ui design", "ui design"],
    isSaved: false,
    image: "/images/Team.jpg",
  },
  {
    id: 5,
    name: "Project Name",
    description: DESC,
    price: "paid",
    priceAmount: 5,
    postedBy: "Dr Name",
    mentorAvatar: "/images/user.jpg",
    postDate: "12 . nov . 2025",
    category: "Cybersecurity",
    difficultyLevel: "Intermediate",
    timeFrame: "3 - 4 Month",
    techStack: ["ui design", "ui design", "ui design", "ui design", "ui design"],
    isSaved: false,
    image: "/images/Team.jpg",
  },
  {
    id: 6,
    name: "Project Name",
    description: DESC,
    price: "free",
    postedBy: "Dr Name",
    mentorAvatar: "/images/user.jpg",
    postDate: "12 . nov . 2025",
    category: "Data Science",
    difficultyLevel: "Intermediate",
    timeFrame: "3 - 4 Month",
    techStack: ["ui design", "ui design", "ui design", "ui design", "ui design"],
    isSaved: true,
    image: "/images/Team.jpg",
  },
  {
    id: 7,
    name: "Project Name",
    description: DESC,
    price: "free",
    postedBy: "Dr Name",
    mentorAvatar: "/images/user.jpg",
    postDate: "12 . nov . 2025",
    category: "Research",
    difficultyLevel: "Intermediate",
    timeFrame: "3 - 4 Month",
    techStack: ["ui design", "ui design", "ui design", "ui design", "ui design"],
    isSaved: false,
    image: "/images/Team.jpg",
  },
  {
    id: 8,
    name: "Project Name",
    description: DESC,
    price: "paid",
    priceAmount: 5,
    postedBy: "Dr Name",
    mentorAvatar: "/images/user.jpg",
    postDate: "12 . nov . 2025",
    category: "Networking",
    difficultyLevel: "Intermediate",
    timeFrame: "3 - 4 Month",
    techStack: ["ui design", "ui design", "ui design", "ui design", "ui design"],
    isSaved: false,
    image: "/images/Team.jpg",
  },
  {
    id: 9,
    name: "Project Name",
    description: DESC,
    price: "free",
    postedBy: "Dr Name",
    mentorAvatar: "/images/user.jpg",
    postDate: "12 . nov . 2025",
    category: "Software",
    difficultyLevel: "Intermediate",
    timeFrame: "3 - 4 Month",
    techStack: ["ui design", "ui design", "ui design", "ui design", "ui design"],
    isSaved: true,
    image: "/images/Team.jpg",
  },
];

const buildPostedAt = (index: number) => {
  const date = new Date(Date.UTC(2026, 2, index + 1));
  return date.toISOString();
};

export const ADMIN_PROJECT_IDEAS: AdminProjectIdeaRecord[] = PROJECTS_IDEAS.map((idea, index) => ({
  ...idea,
  submittedBy: idea.postedBy,
  status: index % 3 === 0 ? "Pending" : index % 3 === 1 ? "Approved" : "Rejected",
  postedAt: buildPostedAt(index),
  selected: index % 2 === 0,
}));

export const ADMIN_PROJECT_IDEA_DETAILS: AdminProjectIdeaDetailRecord[] = ADMIN_PROJECT_IDEAS.map(
  (idea) => ({
    ...idea,
    displayTitle: "Idea Title",
    displayDescription: idea.description,
    displayCategory: "Mobile",
    displayDifficultyLevel: "Intermediate",
    displayTimeFrame: "3 - 4 Month",
    displayTechStack: ["ui design", "ui design", "ui design", "ui design", "ui design"],
    authorName: "Wafaa Amjad",
    authorRole: "Graduate",
    authorStatus: "Active",
    authorAvatar: idea.mentorAvatar,
    authorHref: "/admin/users/1",
    postedAtLabel: "Mar.20.2026",
  }),
);

export const getAdminProjectIdeaById = (id: number) =>
  ADMIN_PROJECT_IDEA_DETAILS.find((idea) => idea.id === id) ?? null;

export const ADMIN_PROJECT_IDEA_STATUS_FILTERS: Array<"All" | AdminProjectIdeaStatus> = [
  "All",
  "Pending",
  "Approved",
  "Rejected",
];

export const IDEAS_SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "best_match", label: "Best Match" },
];

export const IDEAS_CATEGORY_OPTIONS = [
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

export const IDEAS_PRICE_OPTIONS = [
  { value: "", label: "All" },
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
];
