"use client";
import { useState } from "react";
import Image from "next/image";
import { Bookmark } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/buttons";
import { Heading } from "@/components/ui/typography";

/**
 * Represents different project card variants:
 * - "idea": Shows free/paid badge with save button (ProjectIdeasSection)
 * - "saved": Shows project is saved with status badges (Activity -> Saved)
 * - "purchased": Shows project was purchased (Activity -> Purchases)
 */
type ProjectCardVariant = "idea" | "saved" | "purchased";

interface ProjectCardProps {
  /** Unique identifier for the project */
  id: number;
  /** Project title/name */
  title: string;
  /** Project description */
  description: string;
  /** Type of pricing */
  price: "free" | "paid";
  /** Price amount (only for paid projects) */
  priceAmount?: number;
  /** Name of mentor/author */
  postedBy: string;
  /** Avatar image URL */
  mentorAvatar: string;
  /** Initial saved state (only for idea variant) */
  initialSaved?: boolean;
  /** Card display variant */
  variant?: ProjectCardVariant;
  /** Additional status label (for saved variant) */
  statusLabel?: string;
  /** Handler for bookmark toggle (idea variant) */
  onSaveToggle?: (saved: boolean) => void;
  /** Handler for details/files button click */
  onAction?: () => void;
  /** URL for navigation (used by idea, saved, and purchased variants) */
  detailsHref?: string;
  /** Custom CSS classes */
  className?: string;
}

/**
 * Reusable ProjectCard component that handles multiple display variants.
 * Consolidates ProjectIdeaCard and ActivityProjectCard into a single component.
 *
 * @example
 * // Idea variant (Projects Ideas page)
 * <ProjectCard
 *   variant="idea"
 *   id={1}
 *   title="AI Project"
 *   description="..."
 *   price="paid"
 *   priceAmount={5}
 *   postedBy="Dr. Name"
 *   mentorAvatar="..."
 *   detailsHref="/dashboard/projects-ideas/1"
 *   initialSaved={false}
 * />
 *
 * @example
 * // Saved variant (Activity -> Saved section)
 * <ProjectCard
 *   variant="saved"
 *   id={2}
 *   title="Design Project"
 *   price="paid"
 *   priceAmount={10}
 *   statusLabel="Free"
 *   postedBy="Dr. Artist"
 *   mentorAvatar="..."
 * />
 *
 * @example
 * // Purchased variant (Activity -> Purchases section)
 * <ProjectCard
 *   variant="purchased"
 *   id={3}
 *   title="Data Science"
 *   description="..."
 *   price="free"
 *   postedBy="Dr. Data"
 *   mentorAvatar="..."
 * />
 */
const ProjectCard = ({
  id,
  title,
  description,
  price,
  priceAmount,
  postedBy,
  mentorAvatar,
  initialSaved = false,
  variant = "idea",
  statusLabel,
  onSaveToggle,
  onAction,
  detailsHref,
  className = "",
}: ProjectCardProps) => {
  const [saved, setSaved] = useState(initialSaved);

  const handleSaveToggle = () => {
    const newState = !saved;
    setSaved(newState);
    onSaveToggle?.(newState);
  };

  const isSaved = variant === "saved";
  const isPurchased = variant === "purchased";
  const isIdea = variant === "idea";
  const actionLabel = detailsHref ? "View Details" : isPurchased ? "View files" : "View Details";

  return (
    <article
      className={`flex flex-col rounded-xl border border-gray-100 bg-white p-5
        shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(37,99,235,0.08)]
        transition-shadow duration-200 gap-3 ${className}`}
    >
      {/* ── Header: Title + Badges/Status ── */}
      <div className="flex items-start justify-between gap-2">
        <Heading level="h5" className="font-semibold leading-tight text-content-light">
          {title}
        </Heading>

        <div className="flex shrink-0 items-center gap-2">
          {/* IDEA VARIANT: Price amount + Free/Paid badge + Save button */}
          {isIdea && (
            <>
              {price === "paid" && priceAmount !== undefined && (
                <span className="font-primary text-sm font-bold text-success">
                  {priceAmount}$
                </span>
              )}
              <span
                className={`rounded-md border px-2.5 py-0.5 font-primary text-xs font-semibold
                  ${
                    price === "free"
                      ? "border-gray-300 text-content-light"
                      : "border-success text-success"
                  }`}
              >
                {price === "free" ? "Free" : "Paid"}
              </span>
              <button
                type="button"
                onClick={handleSaveToggle}
                aria-label={saved ? "Remove from saved" : "Save idea"}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg
                  transition-colors duration-150 hover:bg-primary-light"
              >
                {saved ? (
                  <Image
                    src="/images/bookmark-check-02.svg"
                    alt=""
                    width={20}
                    height={20}
                    unoptimized
                  />
                ) : (
                  <Bookmark
                    size={18}
                    className="text-content-muted"
                    aria-hidden="true"
                  />
                )}
              </button>
            </>
          )}

          {/* SAVED VARIANT: Status badges */}
          {isSaved && (
            <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
              {price === "paid" && priceAmount !== undefined ? (
                <>
                  <span
                    className="rounded-md bg-success px-2 py-0.5 font-primary text-xs font-bold
                      text-content-inverse"
                  >
                    {priceAmount}$
                  </span>
                  <span
                    className="rounded border border-primary bg-white px-1.5 py-0.5 
                      font-primary text-[10px] font-medium text-primary"
                  >
                    {statusLabel || "Free"}
                  </span>
                </>
              ) : (
                <span
                  className="rounded border border-primary bg-white px-1.5 py-0.5 
                    font-primary text-[10px] font-medium text-primary"
                >
                  {statusLabel || "Free"}
                </span>
              )}
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center"
                aria-hidden="true"
              >
                <Image
                  src="/images/bookmark-check-02.svg"
                  alt=""
                  width={20}
                  height={20}
                  unoptimized
                  className="h-5 w-5 object-contain"
                />
              </span>
            </div>
          )}

          {/* PURCHASED VARIANT: Purchased badge */}
          {isPurchased && (
            <span
              className="shrink-0 rounded-md bg-success px-2 py-0.5 font-primary text-[10px] font-bold
                uppercase tracking-wide text-content-inverse"
            >
              Purchased
            </span>
          )}
        </div>
      </div>

      {/* ── Mentor/Author Info ── */}
      <div className="flex items-center gap-2.5">
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-gray-100">
          <Image
            src={mentorAvatar}
            alt=""
            fill
            unoptimized
            className="object-cover"
            sizes="32px"
          />
        </div>
        <p className="font-primary text-xs text-content-light">
          Posted by {postedBy}
        </p>
      </div>

      {/* ── Description ── */}
      <p className="font-primary text-xs leading-relaxed text-content-light line-clamp-4 flex-1">
        {description}
      </p>

      {/* ── CTA Button ── */}
      {detailsHref ? (
        <LinkButton
          href={detailsHref}
          variant="primary"
          size="md"
          className="mt-auto w-full justify-center"
        >
          {actionLabel}
        </LinkButton>
      ) : (
        <Button
          type="button"
          variant="primary"
          size="md"
          className="mt-auto w-full justify-center"
          onClick={onAction}
        >
          {isPurchased ? "View files" : "View Details"}
        </Button>
      )}
    </article>
  );
};

export default ProjectCard;
