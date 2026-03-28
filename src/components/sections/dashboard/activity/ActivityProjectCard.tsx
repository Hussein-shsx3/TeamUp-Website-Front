"use client";

import Image from "next/image";
import { Button } from "@/components/ui/buttons";
import type { MockPurchasedActivityItem, MockSavedActivityItem } from "@/mock/Activity";

interface ActivityProjectCardProps {
  variant: "saved" | "purchased";
  item: MockSavedActivityItem | MockPurchasedActivityItem;
}

/** Outlined pill — shared by “Paid” and “Free” status labels */
const savedStatusPillClass =
  "rounded border border-primary bg-white px-1.5 py-0.5 font-primary text-[10px] font-medium text-primary";

const ActivityProjectCard = ({ variant, item }: ActivityProjectCardProps) => {
  const isSaved = variant === "saved";
  const saved = isSaved ? (item as MockSavedActivityItem) : null;

  return (
    <article
      className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-4 shadow-sm
        sm:p-5"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="font-primary text-base font-semibold leading-tight text-content-light">
          {item.title}
        </h3>

        {isSaved && saved ? (
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
            {saved.kind === "paid" ? (
              <>
                <span
                  className="rounded-md bg-success px-2 py-0.5 font-primary text-xs font-bold
                    text-content-inverse"
                >
                  {saved.priceLabel}
                </span>
                <span className={savedStatusPillClass}>{saved.statusBadge}</span>
              </>
            ) : (
              <span className={savedStatusPillClass}>{saved.priceLabel}</span>
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
        ) : (
          <span
            className="shrink-0 rounded-md bg-success px-2 py-0.5 font-primary text-[10px] font-bold
              uppercase tracking-wide text-content-inverse"
          >
            Purchased
          </span>
        )}
      </div>

      <div className="mb-3 flex items-center gap-2">
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-gray-100">
          <Image
            src="/images/user.jpg"
            alt=""
            fill
            unoptimized
            className="object-cover"
            sizes="32px"
          />
        </div>
        <p className="font-primary text-xs text-content-light">
          Posted by {item.postedBy}
        </p>
      </div>

      <p className="mb-4 flex-1 font-primary text-sm leading-relaxed text-content-light">
        {item.description}
      </p>

      <Button
        type="button"
        variant="primary"
        size="md"
        className="mt-auto w-full justify-center"
        onClick={() => console.log(variant, item.id, "(mock)")}
      >
        {variant === "saved" ? "View Details" : "View files"}
      </Button>
    </article>
  );
};

export default ActivityProjectCard;
