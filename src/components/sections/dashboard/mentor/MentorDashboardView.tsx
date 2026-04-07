"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Search, Filter, ChevronDown, ArrowUpDown, X } from "lucide-react";
import { LinkButton } from "@/components/ui/buttons";
import { MentorProjectCard } from "@/components/ui/cards";
import { NoResultsState } from "@/components/ui/display";
import IdeasFilterPanel, {
  IdeasFilters,
} from "@/components/sections/dashboard/projectsIdeas/IdeasFilterPanel";
import { IDEAS_SORT_OPTIONS } from "@/mock/ProjectsIdeas";
import {
  MOCK_USER,
  MOCK_MENTOR_POSTED_IDEAS,
  MOCK_MENTOR_SUPERVISED_PROJECTS,
} from "@/mock/Dashboard";

type MentorDashboardTab = "supervise" | "ideas";

interface MentorDashboardViewProps {
  showSuperviseSection?: boolean;
}

const EMPTY_FILTERS: IdeasFilters = {
  category: "",
  price: "",
  requiredSkills: [],
};

function buildActiveChips(filters: IdeasFilters, search: string) {
  const chips: { key: string; label: string }[] = [];
  if (search.trim()) chips.push({ key: "search", label: search.trim() });
  if (filters.category) chips.push({ key: "category", label: filters.category });
  if (filters.price) chips.push({ key: "price", label: filters.price });
  filters.requiredSkills.forEach((skill, index) => {
    chips.push({ key: `skill-${index}`, label: skill });
  });
  return chips;
}

const MentorDashboardView = ({
  showSuperviseSection = true,
}: MentorDashboardViewProps) => {
  const [activeTab, setActiveTab] = useState<MentorDashboardTab>(
    showSuperviseSection ? "supervise" : "ideas",
  );
  const [search, setSearch] = useState("");
  const [sortValue, setSortValue] = useState("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [stagedFilters, setStagedFilters] = useState<IdeasFilters>(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<IdeasFilters>(EMPTY_FILTERS);

  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sortOpen) return;
    const handler = (event: MouseEvent) => {
      if (!sortRef.current?.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [sortOpen]);

  const handleApplyFilter = () => {
    setAppliedFilters(stagedFilters);
    setFilterOpen(false);
  };

  const handleCancelFilter = () => {
    setStagedFilters(appliedFilters);
    setFilterOpen(false);
  };

  const activeChips = buildActiveChips(appliedFilters, search);
  const hasActiveFilters = activeChips.length > 0;

  const removeChip = (key: string) => {
    if (key === "search") {
      setSearch("");
      return;
    }

    const next = { ...appliedFilters };
    if (key === "category") next.category = "";
    else if (key === "price") next.price = "";
    else if (key.startsWith("skill-")) {
      const index = parseInt(key.replace("skill-", ""), 10);
      next.requiredSkills = next.requiredSkills.filter((_, i) => i !== index);
    }

    setAppliedFilters(next);
    setStagedFilters(next);
  };

  const clearAll = () => {
    setSearch("");
    setAppliedFilters(EMPTY_FILTERS);
    setStagedFilters(EMPTY_FILTERS);
  };

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
          actionHref: "/dashboard/projects-ideas/post-new-idea",
        };

  const supervisedProjects = MOCK_MENTOR_SUPERVISED_PROJECTS;
  const postedIdeas = MOCK_MENTOR_POSTED_IDEAS;

  const filteredIdeas = useMemo(() => {
    let list = [...postedIdeas];

    if (search.trim()) {
      const query = search.trim().toLowerCase();
      list = list.filter(
        (idea) =>
          idea.title.toLowerCase().includes(query) ||
          idea.description.toLowerCase().includes(query) ||
          idea.techStack.some((skill) => skill.toLowerCase().includes(query)),
      );
    }

    if (appliedFilters.category) {
      list = list.filter((idea) => idea.category === appliedFilters.category);
    }

    if (appliedFilters.price) {
      list = list.filter((idea) => idea.price === appliedFilters.price);
    }

    if (appliedFilters.requiredSkills.length) {
      list = list.filter((idea) =>
        appliedFilters.requiredSkills.every((skill) =>
          idea.techStack.includes(skill),
        ),
      );
    }

    if (sortValue === "best_match") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      list.sort((a, b) => b.id - a.id);
    }

    return list;
  }, [postedIdeas, search, appliedFilters, sortValue]);

  const currentSortLabel =
    IDEAS_SORT_OPTIONS.find((option) => option.value === sortValue)?.label ??
    "Newest";

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-6">
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <div className="my-3 flex flex-col gap-3">
          <div className="flex flex-wrap items-end gap-3">
            {showSuperviseSection && (
              <button
                type="button"
                onClick={() => setActiveTab("supervise")}
                className={`-mb-px border-b-2 px-5 pb-3 font-primary text-sm transition-colors ${
                  activeTab === "supervise"
                    ? "border-primary text-primary"
                    : "border-gray-200 text-content-light"
                }`}
              >
                Project I Supervise
              </button>
            )}

            <button
              type="button"
              onClick={() => setActiveTab("ideas")}
              className={`pb-3 font-primary text-sm transition-colors ${
                showSuperviseSection
                  ? `-mb-px border-b-2 px-5 ${
                      activeTab === "ideas"
                        ? "border-primary text-primary"
                        : "border-gray-200 text-content-light"
                    }`
                  : "px-0 pb-0 !text-2xl font-semibold text-content-light"
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
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search"
                  className="ml-2 w-full border-0 bg-transparent font-primary text-sm text-content outline-none placeholder:text-content-muted"
                />
              </div>

              <button
                type="button"
                onClick={() => setFilterOpen((open) => !open)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-primary-light ${
                  filterOpen
                    ? "bg-primary-light text-primary"
                    : "bg-transparent text-primary"
                }`}
                aria-label="Filter"
              >
                <Filter size={18} strokeWidth={2.2} aria-hidden="true" />
              </button>

              <div ref={sortRef} className="relative">
                <button
                  type="button"
                  onClick={() => setSortOpen((open) => !open)}
                  className={`flex h-10 items-center gap-2 rounded-lg border px-3 font-primary text-sm transition-colors duration-150 whitespace-nowrap ${
                    sortOpen
                      ? "border-primary bg-primary-light text-primary"
                      : "border-primary bg-white text-primary"
                  }`}
                >
                  <ArrowUpDown size={14} className="shrink-0" aria-hidden="true" />
                  <span>{currentSortLabel}</span>
                  <ChevronDown
                    size={14}
                    className={`shrink-0 transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                {sortOpen && (
                  <div className="absolute right-0 top-[calc(100%+4px)] z-30 min-w-full rounded-xl border border-gray-100 bg-white py-1 shadow-lg sm:min-w-[7.5rem]">
                    {IDEAS_SORT_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setSortValue(option.value);
                          setSortOpen(false);
                        }}
                        className={`flex w-full items-center px-4 py-2.5 font-primary text-sm transition-colors duration-150 ${
                          sortValue === option.value
                            ? "bg-primary-light font-semibold text-primary"
                            : "text-content hover:bg-gray-50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search"
                className="ml-2 w-full border-0 bg-transparent font-primary text-sm text-content outline-none placeholder:text-content-muted"
              />
            </div>
            <button
              type="button"
              onClick={() => setSortOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-primary shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
              aria-label="Sort"
            >
              <ArrowUpDown size={16} strokeWidth={2.2} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setFilterOpen((open) => !open)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg border shadow-[0_1px_4px_rgba(0,0,0,0.04)] ${
                filterOpen
                  ? "border-primary bg-primary-light text-primary"
                  : "border-gray-200 bg-white text-primary"
              }`}
              aria-label="Filter"
            >
              <Filter size={16} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {activeChips.map((chip) => (
                <span
                  key={chip.key}
                  className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 font-primary text-xs font-medium text-content"
                >
                  {chip.label}
                  <button
                    type="button"
                    onClick={() => removeChip(chip.key)}
                    aria-label={`Remove ${chip.label}`}
                    className="ml-1 text-content-muted transition-colors hover:text-error"
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
              <button
                type="button"
                onClick={clearAll}
                className="font-primary text-xs font-medium text-primary hover:underline"
              >
                Clear All
              </button>
            </div>
          )}

          {filterOpen && (
            <div className="w-full pt-2">
              <IdeasFilterPanel
                filters={stagedFilters}
                onChange={setStagedFilters}
                onApply={handleApplyFilter}
                onCancel={handleCancelFilter}
              />
            </div>
          )}
        </div>

        {showSuperviseSection && activeTab === "supervise" ? (
          supervisedProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-5">
              {supervisedProjects.map((project) => (
                <MentorProjectCard
                  key={project.id}
                  variant="supervise"
                  project={project}
                />
              ))}
            </div>
          ) : (
            <NoResultsState
              message={emptyState.message}
              actionLabel={emptyState.actionLabel}
              actionHref={emptyState.actionHref}
            />
          )
        ) : filteredIdeas.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredIdeas.map((idea) => (
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
            <p className="font-primary text-sm text-content-light">
              {MOCK_USER.role}
            </p>
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
            href="/dashboard/projects-ideas/post-new-idea"
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
