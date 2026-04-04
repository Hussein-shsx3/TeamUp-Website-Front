"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Funnel, ArrowDownWideNarrow } from "lucide-react";
import { LinkButton } from "@/components/ui/buttons";
import { MentorProjectCard } from "@/components/ui/cards";
import { NoResultsState } from "@/components/ui/display";
import {
  MOCK_USER,
  MOCK_MENTOR_POSTED_IDEAS,
  MOCK_MENTOR_SUPERVISED_PROJECTS,
} from "@/mock/Dashboard";

type MentorDashboardTab = "supervise" | "ideas";

const MentorDashboardView = () => {
  const [activeTab, setActiveTab] = useState<MentorDashboardTab>("supervise");

  const emptyState =
    activeTab === "supervise"
      ? {
          message: "You are not supervising any projects yet",
          actionLabel: "Review Student Proposals",
          actionHref: "/dashboard/find-team",
        }
      : {
          message: "You have not posted any ideas yet",
          actionLabel: "Post New Idea",
          actionHref: "/dashboard/projects-ideas",
        };

  const supervisedProjects = MOCK_MENTOR_SUPERVISED_PROJECTS;
  const postedIdeas = MOCK_MENTOR_POSTED_IDEAS;

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-6">
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <div className="flex flex-col gap-3 my-3">
          <div className="flex flex-wrap items-end">
            <button
              type="button"
              onClick={() => setActiveTab("supervise")}
              className={`-mb-px px-5 border-b-2 pb-3 font-primary text-sm transition-colors ${
                activeTab === "supervise"
                  ? "border-primary text-primary"
                  : "border-gray-200 text-content-light"
              }`}
            >
              Project I Supervise
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ideas")}
              className={`-mb-px px-5 border-b-2 pb-3 font-primary text-sm transition-colors ${
                activeTab === "ideas"
                  ? "border-primary text-primary"
                  : "border-gray-200 text-content-light"
              }`}
            >
              My posted Idea
            </button>

            <div className="ml-auto hidden items-center gap-3 md:flex">
              <div className="flex h-10 w-52 items-center rounded-lg border border-gray-200 bg-white px-3 lg:w-60">
                <Search
                  size={16}
                  className="text-content-muted"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  placeholder="Search"
                  className="ml-2 w-full border-0 bg-transparent font-primary text-sm text-content outline-none placeholder:text-content-muted"
                />
              </div>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-transparent text-primary transition-colors hover:bg-primary-light"
                aria-label="Sort"
              >
                <Funnel
                  size={18}
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-transparent text-primary transition-colors hover:bg-primary-light"
                aria-label="Filter"
              >
                <ArrowDownWideNarrow size={18} strokeWidth={2.2} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1 md:hidden">
            <div className="flex h-10 flex-1 items-center rounded-lg border border-gray-200 bg-white px-3">
              <Search
                size={16}
                className="text-content-muted"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search"
                className="ml-2 w-full border-0 bg-transparent font-primary text-sm text-content outline-none placeholder:text-content-muted"
              />
            </div>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-primary shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
              aria-label="Sort"
            >
              <Funnel
                size={16}
                strokeWidth={2.2}
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-primary shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
              aria-label="Filter"
            >
              <ArrowDownWideNarrow size={16} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </div>
        </div>

        {activeTab === "supervise" ? (
          supervisedProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-5">
              {supervisedProjects.map((project) => (
                <MentorProjectCard key={project.id} variant="supervise" project={project} />
              ))}
            </div>
          ) : (
            <NoResultsState
              message={emptyState.message}
              actionLabel={emptyState.actionLabel}
              actionHref={emptyState.actionHref}
            />
          )
        ) : postedIdeas.length > 0 ? (
          <div className="flex flex-col gap-4">
            {postedIdeas.map((idea) => (
              <MentorProjectCard key={idea.id} variant="idea" project={idea} />
            ))}
          </div>
        ) : (
          <NoResultsState
            message={emptyState.message}
            actionLabel={emptyState.actionLabel}
            actionHref={emptyState.actionHref}
          />
        )}
      </div>

      <div className="w-full lg:w-[300px] lg:shrink-0">
        <div className="rounded-lg border border-gray-100 bg-white px-6 py-8 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col items-center text-center">
            <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-primary">
              <Image
                src={MOCK_USER.avatar}
                alt={MOCK_USER.name}
                fill
                unoptimized
                className="object-cover"
                sizes="80px"
              />
            </div>
            <p className="mt-4 font-primary text-base font-semibold text-content-light">
              {MOCK_USER.name}
            </p>
            <p className="font-primary text-sm text-content-light">Mentor</p>
          </div>

          <div className="mt-8">
            <p className="font-primary text-sm font-medium text-content-light">
              Area of Expertise
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {MOCK_USER.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-primary-light px-3 py-1 font-primary text-xs font-medium text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <LinkButton
            href="/dashboard/profile"
            variant="secondary"
            size="md"
            className="mt-8 w-full"
          >
            Edit Profile
          </LinkButton>
        </div>

        <div className="mt-5 rounded-lg border border-gray-100 bg-gray-50 px-6 py-5 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          <p className="font-primary text-sm font-semibold text-content-light">
            Have a project idea in your mind but you do see here?
          </p>
          <LinkButton
            href="/dashboard/projects-ideas"
            variant="secondary"
            size="md"
            className="mt-4 w-full"
          >
            Post new idea
          </LinkButton>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboardView;
