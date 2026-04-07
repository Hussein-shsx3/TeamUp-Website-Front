"use client";
import { useState } from "react";
import Image from "next/image";
import { Bookmark } from "lucide-react";
import { LinkButton } from "@/components/ui/buttons";
import type { ProjectIdea } from "@/mock/ProjectsIdeas";
import { Heading } from "@/components/ui/typography";

interface ProjectIdeaCardProps {
  idea: ProjectIdea;
}

const ProjectIdeaCard = ({ idea }: ProjectIdeaCardProps) => {
  const {
    id,
    name,
    description,
    price,
    priceAmount,
    postedBy,
    mentorAvatar,
    isSaved,
  } = idea;
  const [saved, setSaved] = useState(isSaved);

  return (
    <article
      className="flex flex-col rounded-xl border border-gray-100 bg-white p-5
        shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow duration-200
        hover:shadow-[0_4px_20px_rgba(37,99,235,0.08)] gap-3"
    >
      {/* ── Row 1: title + badges + bookmark ── */}
      <div className="flex items-start justify-between gap-2">
        <Heading level="h3" className="font-primary text-base font-semibold leading-tight text-content-light">
          {name}
        </Heading>

        <div className="flex shrink-0 items-center gap-2">
          {/* Price amount chip — only for paid */}
          {price === "paid" && priceAmount !== undefined && (
            <span className="font-primary text-sm font-bold text-success">
              {priceAmount}$
            </span>
          )}

          {/* Free / Paid label badge */}
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

          {/* Bookmark button */}
          <button
            type="button"
            onClick={() => setSaved((s) => !s)}
            aria-label={saved ? "Remove from saved" : "Save idea"}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg
              transition-colors duration-150 hover:bg-primary-light"
          >
            {saved ? (
              /* Saved — use the existing bookmark-check SVG from public */
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
        </div>
      </div>

      {/* ── Row 2: mentor avatar + posted by ── */}
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

      {/* ── Row 3: description ── */}
      <p className="font-primary text-xs leading-relaxed text-content-light line-clamp-4 flex-1">
        {description}
      </p>

      {/* ── Row 4: CTA ── */}
      <LinkButton
        href={`/dashboard/projects-ideas/${id}`}
        variant="primary"
        size="md"
        className="mt-auto w-full justify-center"
      >
        View Details
      </LinkButton>
    </article>
  );
};

export default ProjectIdeaCard;
