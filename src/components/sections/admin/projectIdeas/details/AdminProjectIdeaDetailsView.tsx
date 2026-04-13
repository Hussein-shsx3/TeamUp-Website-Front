"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, Download, FileText } from "lucide-react";
import { Breadcrumb } from "@/components/ui/navigation";
import { ApproveProjectIdeaModal, RejectProjectIdeaModal } from "@/components/ui/modals";
import { Button } from "@/components/ui/buttons";
import { Heading } from "@/components/ui/typography";
import type { AdminProjectIdeaDetailRecord } from "@/mock/ProjectsIdeas";

interface AdminProjectIdeaDetailsViewProps {
  idea: AdminProjectIdeaDetailRecord;
}

const fileEntries = {
  free: [{ name: "File Name", size: "2.4 mp" }],
  paid: [
    { name: "File Name", size: "2.4 mp" },
    { name: "File Name", size: "2.4 mp" },
    { name: "File Name", size: "2.4 mp" },
  ],
};

const AdminProjectIdeaDetailsView = ({ idea }: AdminProjectIdeaDetailsViewProps) => {
  const [activeActionModal, setActiveActionModal] = useState<"approve" | "reject" | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const title = idea.displayTitle ?? idea.name;
  const description = idea.displayDescription ?? idea.description;
  const category = idea.displayCategory ?? idea.category;
  const difficultyLevel = idea.displayDifficultyLevel ?? idea.difficultyLevel;
  const timeFrame = idea.displayTimeFrame ?? idea.timeFrame;
  const techStack = idea.displayTechStack ?? idea.techStack;
  const authorName = idea.authorName ?? idea.postedBy;

  return (
    <div className="flex flex-col">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Project Ideas", href: "/admin/project-ideas" },
          { label: "Idea Details" },
        ]}
      />

      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Heading level="h4" className="text-[28px] font-semibold text-content-light sm:text-[30px]">
          {title}
        </Heading>

        <div className="flex items-center gap-2 self-start lg:self-auto">
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => setActiveActionModal("approve")}
            className="h-10 px-5 text-sm shadow-none"
          >
            Approve
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={() => setActiveActionModal("reject")}
            className="h-10 border-rose-200 px-5 text-sm !text-rose-500 hover:border-rose-300 hover:!bg-rose-50"
          >
            Reject
          </Button>
        </div>
      </div>

      {notice ? (
        <div className="mb-5 inline-flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 px-3 py-2 font-primary text-sm text-primary">
          <CheckCircle2 size={16} aria-hidden="true" />
          {notice}
        </div>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)] sm:p-6">
          <Heading level="h5" className="mb-3 font-semibold text-content-light">
            Project Idea Overview
          </Heading>
          <p className="max-w-3xl font-primary text-sm leading-6 text-content-light">
            {description}
          </p>

          <Heading level="h5" className="mt-6 mb-3 font-semibold text-content-light">
            Problem Statement
          </Heading>
          <p className="max-w-3xl font-primary text-sm leading-6 text-content-light">
            {description}
          </p>

          <Heading level="h5" className="mt-6 mb-3 font-semibold text-content-light">
            Attachments
          </Heading>

          <div className="space-y-4">
            <div>
              <p className="mb-2 font-primary text-sm text-content-light">Project idea Free Files</p>
              <div className="space-y-2">
                {fileEntries.free.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_1px_6px_rgba(0,0,0,0.04)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-light text-primary">
                        <FileText size={16} aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-primary text-sm font-semibold text-content">{file.name}</p>
                        <p className="font-primary text-xs text-content-muted">{file.size}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label={`Download ${file.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-content-muted hover:bg-primary-light hover:text-primary"
                    >
                      <Download size={16} aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 font-primary text-sm text-content-light">Project idea Paid Files</p>
              <div className="space-y-2">
                {fileEntries.paid.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_1px_6px_rgba(0,0,0,0.04)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-light text-primary">
                        <FileText size={16} aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-primary text-sm font-semibold text-content">{file.name}</p>
                        <p className="font-primary text-xs text-content-muted">{file.size}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label={`Download ${file.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-content-muted hover:bg-primary-light hover:text-primary"
                    >
                      <Download size={16} aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-5 lg:sticky lg:top-24">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
            <Heading level="h5" className="mb-5 font-semibold text-content">
              Technical Details
            </Heading>

            <DetailRow label="Category" icon={<FileText size={15} aria-hidden="true" />} value={category} />
            <DetailRow
              label="Difficulty level"
              icon={<BarIcon />}
              value={difficultyLevel.toLowerCase()}
            />
            <DetailRow label="Time Frame" icon={<Clock3 size={15} aria-hidden="true" />} value={timeFrame} />

            <div className="mt-5">
              <p className="mb-3 font-primary text-sm font-semibold text-content">Technology stack</p>
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
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full ring-2 ring-primary">
                <Image
                  src={idea.authorAvatar}
                  alt={authorName}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              <Heading level="h5" className="font-semibold text-content">
                {authorName}
              </Heading>

              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-full bg-amber-100 px-3 py-1 font-primary text-[11px] text-amber-500">
                  {idea.authorRole}
                </span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 font-primary text-[11px] text-emerald-500">
                  {idea.authorStatus}
                </span>
              </div>

              <Link
                href={idea.authorHref}
                className="mt-3 inline-flex items-center gap-2 font-primary text-xs text-primary transition-colors hover:text-primary/80"
              >
                View Profile
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="font-primary text-sm font-semibold text-content-light">Post Date</p>
                <p className="mt-1 font-primary text-sm text-content-light">{idea.postedAtLabel}</p>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="font-primary text-sm font-semibold text-content-light">Paid</p>
                <p className="font-primary text-sm font-semibold text-content-light">{idea.priceAmount ? `${idea.priceAmount}$` : "Free"}</p>
              </div>
            </div>
          </section>
        </aside>
      </div>

      <ApproveProjectIdeaModal
        isOpen={activeActionModal === "approve"}
        onClose={() => setActiveActionModal(null)}
        onConfirm={() => {
          setNotice(`${title} approved`);
          setActiveActionModal(null);
        }}
        ideaName={title}
      />

      <RejectProjectIdeaModal
        isOpen={activeActionModal === "reject"}
        onClose={() => setActiveActionModal(null)}
        onConfirm={(reason) => {
          setNotice(reason?.trim() ? `${title} rejected: ${reason.trim()}` : `${title} rejected`);
          setActiveActionModal(null);
        }}
        ideaName={title}
      />
    </div>
  );
};

const DetailRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="mb-5 flex items-center justify-between gap-4 last:mb-0">
      <p className="font-primary text-sm font-semibold text-content-light">{label}</p>
      <div className="flex items-center gap-2 text-content-muted">
        <span className="text-primary">{icon}</span>
        <p className="font-primary text-xs text-content-light">{value}</p>
      </div>
    </div>
  );
};

const BarIcon = () => (
  <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
    <rect x="1" y="8" width="3" height="7" rx="1" fill="currentColor" />
    <rect x="6.5" y="5" width="3" height="10" rx="1" fill="currentColor" />
    <rect x="12" y="2" width="3" height="13" rx="1" fill="currentColor" />
  </svg>
);

export default AdminProjectIdeaDetailsView;