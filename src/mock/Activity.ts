export const ACTIVITY_NAV_LINKS = [
  {
    id: "saved" as const,
    label: "Saved Ideas",
    href: "/dashboard/activity/saved",
  },
  {
    id: "purchases" as const,
    label: "My Purchases",
    href: "/dashboard/activity/purchases",
  },
];

const description =
  "This graduation project explores innovative solutions in [Industry Name], focusing on solving real-world challenges through research and practical implementation.";

export interface MockSavedActivityItem {
  id: number;
  title: string;
  description: string;
  postedBy: string;
  /** Top-right price chip */
  priceLabel: string;
  kind: "paid" | "free";
  /** Small badge next to price */
  statusBadge: "Paid" | "Free";
  /** Whether this item already grants access to the project folder */
  isPurchased?: boolean;
}

export const MOCK_SAVED_ACTIVITY_ITEMS: MockSavedActivityItem[] = [
  {
    id: 1,
    title: "Project Name",
    description,
    postedBy: "Dr Name",
    priceLabel: "5$",
    kind: "paid",
    statusBadge: "Paid",
    isPurchased: true,
  },
  {
    id: 2,
    title: "Project Name",
    description,
    postedBy: "Dr Name",
    priceLabel: "Free",
    kind: "free",
    statusBadge: "Free",
    isPurchased: true,
  },
  {
    id: 3,
    title: "Project Name",
    description,
    postedBy: "Dr Name",
    priceLabel: "5$",
    kind: "paid",
    statusBadge: "Paid",
    isPurchased: true,
  },
  {
    id: 4,
    title: "Project Name",
    description,
    postedBy: "Dr Name",
    priceLabel: "Free",
    kind: "free",
    statusBadge: "Free",
    isPurchased: true,
  },
  {
    id: 5,
    title: "Project Name",
    description,
    postedBy: "Dr Name",
    priceLabel: "5$",
    kind: "paid",
    statusBadge: "Paid",
    isPurchased: true,
  },
  {
    id: 6,
    title: "Project Name",
    description,
    postedBy: "Dr Name",
    priceLabel: "Free",
    kind: "free",
    statusBadge: "Free",
    isPurchased: true,
  },
];

export interface MockPurchasedActivityItem {
  id: number;
  title: string;
  description: string;
  postedBy: string;
  isPurchased?: boolean;
}

export const MOCK_PURCHASED_ACTIVITY_ITEMS: MockPurchasedActivityItem[] =
  MOCK_SAVED_ACTIVITY_ITEMS.map(({ id, title, description, postedBy }) => ({
    id,
    title,
    description,
    postedBy,
    isPurchased: true,
  }));
