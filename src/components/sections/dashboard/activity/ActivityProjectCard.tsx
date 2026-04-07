"use client";

import ProjectCard from "@/components/ui/cards/ProjectCard";
import type { MockPurchasedActivityItem, MockSavedActivityItem } from "@/mock/Activity";

interface ActivityProjectCardProps {
  variant: "saved" | "purchased";
  item: MockSavedActivityItem | MockPurchasedActivityItem;
}

/**
 * Activity Project Card — thin wrapper around ProjectCard.
 * Handles Activity-specific data mapping for saved and purchased items.
 */
const ActivityProjectCard = ({ variant, item }: ActivityProjectCardProps) => {
  const isSaved = variant === "saved";
  const saved = isSaved ? (item as MockSavedActivityItem) : null;

  // Determine price and status based on the variant
  const price = saved?.kind === "paid" ? "paid" : "free";
  const priceAmount = saved?.kind === "paid" ? parseInt(saved.priceLabel, 10) : undefined;
  const statusLabel = saved?.statusBadge || saved?.priceLabel || "Free";

  return (
    <ProjectCard
      variant={isSaved ? "saved" : "purchased"}
      id={item.id}
      title={item.title}
      description={item.description}
      price={price}
      priceAmount={priceAmount}
      postedBy={item.postedBy}
      mentorAvatar="/images/user.jpg"
      statusLabel={statusLabel}
      detailsHref={`/dashboard/projects-ideas/${item.id}`}
    />
  );
};

export default ActivityProjectCard;
