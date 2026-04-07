"use client";

import { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Bookmark, Clock3, Download, FileLock, FileText } from "lucide-react";
import { Breadcrumb } from "@/components/ui/navigation";
import { Button, LinkButton } from "@/components/ui/buttons";
import { Heading } from "@/components/ui/typography";
import { ProjectIdeaCheckoutModal } from "@/components/ui/modals";
import { MOCK_PURCHASED_ACTIVITY_ITEMS, TEAM_WORKSPACE_HREF } from "@/mock";
import { PROJECTS_IDEAS } from "@/mock/ProjectsIdeas";

interface ProjectIdeasDetailPageProps {
  id: string;
}

const ProjectIdeasDetailPage = ({ id }: ProjectIdeasDetailPageProps) => {
  const project = PROJECTS_IDEAS.find((item) => item.id === Number(id));
  const isPurchasedFromActivity = MOCK_PURCHASED_ACTIVITY_ITEMS.some(
    (item) => item.id === Number(id),
  );

  const [saved, setSaved] = useState(project?.isSaved ?? false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPurchased, setIsPurchased] = useState(isPurchasedFromActivity);

  if (!project) return notFound();

  const {
    name,
    description,
    price,
    priceAmount,
    postedBy,
    mentorAvatar,
    postDate,
    difficultyLevel,
    timeFrame,
    techStack,
    image,
  } = project;

  const isPaid = price === "paid";
  const attachmentLocked = isPaid && !isPurchased;
  const attachmentItems = [1, 2, 3];

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Main Student Dashboard", href: "/dashboard" },
          { label: "Projects Ideas", href: "/dashboard/projects-ideas" },
          { label: name },
        ]}
      />

      <div className="mb-6 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col sm:flex-row">
          <div className="relative h-40 w-full shrink-0 bg-gradient-to-br from-blue-100 to-blue-50 sm:h-auto sm:min-h-[132px] sm:w-36 md:w-48">
            <Image
              src={image}
              alt={name}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 160px"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-3 p-5 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-3">
                  <Heading level="h4" className="font-semibold text-content-light">
                    {name}
                  </Heading>
                  {isPaid && priceAmount ? (
                    <span className="font-primary text-sm font-semibold text-success">
                      {priceAmount}$
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <span
                  className={`rounded-md border px-2.5 py-0.5 font-primary text-xs font-semibold ${
                    isPurchased ? "border-emerald-500 text-emerald-500" : "border-primary text-primary"
                  }`}
                >
                  {isPurchased ? "Purchased" : isPaid ? "Paid" : "Free"}
                </span>
                <button
                  type="button"
                  onClick={() => setSaved((value) => !value)}
                  aria-label={saved ? "Remove from saved" : "Save idea"}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-content-muted transition-colors duration-150 hover:bg-primary-light hover:text-primary"
                >
                  <Bookmark size={18} aria-hidden="true" className={saved ? "fill-current" : ""} />
                </button>
              </div>
            </div>

            <p className="max-w-3xl font-primary text-sm leading-relaxed text-content-light">
              {description}
            </p>

            <div className="mt-auto flex flex-wrap items-center gap-5 pt-1">
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-gray-100">
                  <Image
                    src={mentorAvatar}
                    alt={postedBy}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <div>
                  <p className="font-primary text-xs text-content-muted">Posted By</p>
                  <p className="font-primary text-xs font-medium text-content-light">
                    {postedBy}
                  </p>
                </div>
              </div>

              <span className="h-8 w-px bg-gray-200" aria-hidden="true" />

              <div>
                <p className="font-primary text-xs text-content-muted">Post Date</p>
                <p className="font-primary text-xs font-medium text-content-light">
                  {postDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <div className="rounded-lg border border-gray-100 bg-gray-100 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <Heading level="h5" className="mb-4 font-semibold text-content">
              Project Idea Overview
            </Heading>
            <p className="max-w-3xl font-primary text-sm leading-relaxed text-content-light">
              {description}
            </p>

            <Heading level="h5" className="mt-6 mb-4 font-semibold text-content">
              Problem Statement
            </Heading>
            <p className="max-w-3xl font-primary text-sm leading-relaxed text-content-light">
              {description}
            </p>

            <Heading level="h5" className="mt-6 mb-4 font-semibold text-content">
              Attachments
            </Heading>
            <div className="flex flex-col gap-3">
              {attachmentItems.map((item) => (
                <div
                  key={item}
                  aria-disabled={attachmentLocked}
                  className={`flex items-center justify-between rounded-lg border px-4 py-3 shadow-[0_1px_6px_rgba(0,0,0,0.04)] ${
                    attachmentLocked
                      ? "cursor-not-allowed border-gray-100 bg-gray-50 opacity-80"
                      : "border-gray-100 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-md ${
                        attachmentLocked ? "bg-gray-200 text-content-muted" : "bg-primary-light text-primary"
                      }`}
                    >
                      <FileText size={16} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-primary text-sm font-semibold text-content">File Name</p>
                      <p className="font-primary text-xs text-content-muted">2.4 mb</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {attachmentLocked && (
                      <span className="font-primary text-xs text-content-muted">Locked until purchase</span>
                    )}
                    <button
                      type="button"
                      disabled={attachmentLocked}
                      className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                        attachmentLocked
                          ? "cursor-not-allowed text-content-muted"
                          : "text-content-muted hover:bg-primary-light hover:text-primary"
                      }`}
                      aria-label={attachmentLocked ? "Attachment locked until purchase" : "Download attachment"}
                    >
                      {attachmentLocked ? (
                        <FileLock size={16} aria-hidden="true" />
                      ) : (
                        <Download size={16} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 lg:shrink-0">
          <div className="sticky top-24 rounded-lg border border-gray-100 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <Heading level="h5" className="mb-6 font-semibold text-content">
              Technical Details
            </Heading>

            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="font-primary text-sm font-semibold text-content-light">Category</p>
              <div className="flex items-center gap-2 text-content-muted">
                <div className="flex h-5 w-5 items-center justify-center text-primary">
                  <FileText size={16} aria-hidden="true" />
                </div>
                <p className="font-primary text-xs text-content-light">Mobile</p>
              </div>
            </div>

            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="font-primary text-sm font-semibold text-content-light">Difficulty level</p>
              <div className="flex items-center gap-2 text-content-muted">
                <div className="flex h-5 w-5 items-center justify-center text-primary">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                    <rect x="1" y="8" width="3" height="7" rx="1" fill="currentColor" />
                    <rect x="6.5" y="5" width="3" height="10" rx="1" fill="currentColor" />
                    <rect x="12" y="2" width="3" height="13" rx="1" fill="currentColor" />
                  </svg>
                </div>
                <p className="font-primary text-xs text-content-light">{difficultyLevel.toLowerCase()}</p>
              </div>
            </div>

            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="font-primary text-sm font-semibold text-content-light">Time Frame</p>
              <div className="flex items-center gap-2 text-content-muted">
                <div className="flex h-5 w-5 items-center justify-center text-primary">
                  <Clock3 size={16} aria-hidden="true" />
                </div>
                <p className="font-primary text-xs text-content-light">{timeFrame}</p>
              </div>
            </div>

            <div>
              <p className="mb-3 font-primary text-sm font-semibold text-content-light">Technology stack</p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <span
                    key={`${tech}-${index}`}
                    className="rounded-md bg-primary-light px-3 py-1 font-primary text-xs text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isPaid && (
        <div className="mt-10 border-t py-8">
          <div className="flex items-center justify-end gap-6">
            <div className="text-right">
              <p className="font-primary text-sm text-content-light">Price</p>
              <p className="font-primary text-sm font-semibold text-success">
                {priceAmount ? `${priceAmount}$` : "Paid"}
              </p>
            </div>

            {isPurchased ? (
              <div className="flex flex-wrap items-center gap-3">
                <Button type="button" variant="primary" size="md" className="min-w-44 px-8" disabled>
                  Purchased
                </Button>
                <LinkButton
                  href={TEAM_WORKSPACE_HREF}
                  variant="secondary"
                  size="md"
                  className="min-w-44 justify-center px-8"
                >
                  Open project folder
                </LinkButton>
              </div>
            ) : (
              <Button
                type="button"
                variant="primary"
                size="md"
                className="min-w-44 px-8"
                onClick={() => setIsCheckoutOpen(true)}
              >
                Buy Idea Now
              </Button>
            )}
          </div>
        </div>
      )}

      <ProjectIdeaCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        projectName={name}
        priceLabel={priceAmount ? `${priceAmount}$` : "Paid"}
        onPurchased={() => setIsPurchased(true)}
      />
    </>
  );
};

export default ProjectIdeasDetailPage;
