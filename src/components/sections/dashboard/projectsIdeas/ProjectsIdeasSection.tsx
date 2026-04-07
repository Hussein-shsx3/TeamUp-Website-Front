"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, ChevronDown, ArrowUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/buttons";
import { Heading } from "@/components/ui/typography";
import { PROJECTS_IDEAS, IDEAS_SORT_OPTIONS } from "@/mock/ProjectsIdeas";
import ProjectCard from "@/components/ui/cards/ProjectCard";
import IdeasFilterPanel, { IdeasFilters } from "./IdeasFilterPanel";

const EMPTY_FILTERS: IdeasFilters = {
  category: "",
  price: "",
  requiredSkills: [],
};

function buildActiveChips(filters: IdeasFilters, search: string) {
  const chips: { key: string; label: string }[] = [];
  if (search.trim()) chips.push({ key: "search", label: search.trim() });
  if (filters.category)
    chips.push({ key: "category", label: filters.category });
  if (filters.price) chips.push({ key: "price", label: filters.price });
  filters.requiredSkills.forEach((s, i) =>
    chips.push({ key: `skill-${i}`, label: s }),
  );
  return chips;
}

const ProjectsIdeasSection = () => {
  const [search, setSearch] = useState("");
  const [sortValue, setSortValue] = useState("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const [stagedFilters, setStagedFilters] =
    useState<IdeasFilters>(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] =
    useState<IdeasFilters>(EMPTY_FILTERS);

  const sortRef = useRef<HTMLDivElement>(null);

  /* Close sort on outside click */
  useEffect(() => {
    if (!sortOpen) return;
    const handler = (e: MouseEvent) => {
      if (!sortRef.current?.contains(e.target as Node)) setSortOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [sortOpen]);

  const handleApply = () => {
    setAppliedFilters(stagedFilters);
    setFilterOpen(false);
  };

  const handleCancel = () => {
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
      const idx = parseInt(key.replace("skill-", ""), 10);
      next.requiredSkills = next.requiredSkills.filter((_, i) => i !== idx);
    }
    setAppliedFilters(next);
    setStagedFilters(next);
  };

  const clearAll = () => {
    setSearch("");
    setAppliedFilters(EMPTY_FILTERS);
    setStagedFilters(EMPTY_FILTERS);
  };

  const filtered = useMemo(() => {
    let list = [...PROJECTS_IDEAS];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }
    if (appliedFilters.category)
      list = list.filter((p) => p.category === appliedFilters.category);
    if (appliedFilters.price)
      list = list.filter((p) => p.price === appliedFilters.price);
    return list;
  }, [search, appliedFilters]);

  const currentSortLabel =
    IDEAS_SORT_OPTIONS.find((o) => o.value === sortValue)?.label ?? "Newest";

  return (
    <>
      {/* ── Page Header ── */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Heading level="h3" className="font-semibold text-content-light">
            Explore Projects ideas
          </Heading>
          <p className="mt-1 font-primary text-sm text-content-light">
            Find your inspiration and start today
          </p>
        </div>

        {/* Add New Idea */}
        <Link
          href="/dashboard/projects-ideas/post-new-idea"
          className="shrink-0 self-start rounded-lg bg-primary px-8 py-2.5 font-primary text-sm font-semibold text-white transition-all hover:bg-primary-dark"
        >
          Add New Idea
        </Link>
      </div>

      {/* ── Toolbar ── */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        {/* Search — full width, grows */}
        <div className="relative min-w-0 flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-content-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            aria-label="Search ideas"
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-4
              font-primary text-sm text-content placeholder:text-content-muted
              focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15
              transition-colors"
          />
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          {/* Filter */}
          <button
            type="button"
            onClick={() => setFilterOpen((o) => !o)}
            className={`inline-flex w-full shrink-0 items-center gap-2 rounded-lg border px-4 py-2.5
              font-primary text-sm font-medium transition-colors duration-150 whitespace-nowrap sm:w-auto
              ${
                filterOpen
                  ? "border-primary bg-primary-light text-primary"
                  : "border-gray-200 bg-white text-content-light hover:border-primary/40 hover:bg-primary-light/30"
              }`}
          >
            <Filter size={17} aria-hidden="true" />
            Filter
          </button>

          {/* Sort */}
          <div ref={sortRef} className="relative w-full shrink-0 sm:w-auto">
            <button
              type="button"
              onClick={() => setSortOpen((o) => !o)}
              className={`inline-flex w-full items-center gap-2 rounded-lg border px-3 py-2.5
                font-primary text-sm font-medium transition-colors duration-150 whitespace-nowrap
                sm:min-w-[7.5rem]
                ${
                  sortOpen
                    ? "border-primary bg-primary-light text-primary"
                    : "border-primary bg-white text-primary"
                }`}
            >
              <ArrowUpDown size={14} className="shrink-0" aria-hidden="true" />
              <span className="flex-1 text-left">{currentSortLabel}</span>
              <ChevronDown
                size={14}
                className={`shrink-0 transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            {sortOpen && (
              <div
                className="absolute right-0 top-[calc(100%+4px)] z-30 min-w-full
                rounded-xl border border-gray-100 bg-white py-1 shadow-lg sm:min-w-[7.5rem]"
              >
                {IDEAS_SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setSortValue(opt.value);
                      setSortOpen(false);
                    }}
                    className={`flex w-full items-center px-4 py-2.5 font-primary text-sm
                      transition-colors duration-150
                      ${
                        sortValue === opt.value
                          ? "bg-primary-light font-semibold text-primary"
                          : "text-content hover:bg-gray-50"
                      }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Active filter chips ── */}
      {hasActiveFilters && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {search.trim() && (
            <span
              className="inline-flex items-center gap-1 rounded-full border border-gray-200
              bg-white px-3 py-1 font-primary text-xs font-medium text-content"
            >
              {search.trim()}
              <button
                type="button"
                onClick={() => setSearch("")}
                className="ml-1 text-content-muted hover:text-error transition-colors"
              >
                <X size={11} />
              </button>
            </span>
          )}
          {activeChips
            .filter((c) => c.key !== "search")
            .map((chip) => (
              <span
                key={chip.key}
                className="inline-flex items-center gap-1 rounded-md bg-primary-light
                px-3 py-1 font-primary text-xs font-medium text-primary"
              >
                <span className="text-content-light">Status : </span>
                {chip.label}
                <button
                  type="button"
                  onClick={() => removeChip(chip.key)}
                  aria-label={`Remove ${chip.label}`}
                  className="ml-1 hover:text-error transition-colors"
                >
                  <X size={13} />
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

      {/* ── Result count ── */}
      {hasActiveFilters && filtered.length > 0 && (
        <p className="mb-4 font-primary text-sm font-medium text-content-light">
          {filtered.length} Result{filtered.length !== 1 ? "s" : ""} founded
        </p>
      )}

      {/* ── Main content: grid + optional inline filter panel ── */}
      <div
        className={`flex items-start gap-5 ${filterOpen ? "flex-col lg:flex-row" : ""}`}
      >
        {/* Mobile filter panel — above cards */}
        {filterOpen && (
          <div className="w-full lg:hidden">
            <IdeasFilterPanel
              filters={stagedFilters}
              onChange={setStagedFilters}
              onApply={handleApply}
              onCancel={handleCancel}
            />
          </div>
        )}

        {/* Cards grid */}
        <div className="min-w-0 flex-1">
          {filtered.length > 0 ? (
            <div
              className={`grid grid-cols-1 gap-4 sm:gap-5
                ${filterOpen ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}
            >
              {filtered.map((idea) => (
                <ProjectCard
                  key={idea.id}
                  variant="idea"
                  id={idea.id}
                  title={idea.name}
                  description={idea.description}
                  price={idea.price}
                  priceAmount={idea.priceAmount}
                  postedBy={idea.postedBy}
                  mentorAvatar={idea.mentorAvatar}
                  initialSaved={idea.isSaved}
                  detailsHref={`/dashboard/projects-ideas/${idea.id}`}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="opacity-60"
              >
                <circle
                  cx="52"
                  cy="52"
                  r="36"
                  stroke="#DBEAFE"
                  strokeWidth="3"
                />
                <circle
                  cx="52"
                  cy="52"
                  r="24"
                  stroke="#BFDBFE"
                  strokeWidth="2"
                />
                <path
                  d="M40 52h24M52 40v24"
                  stroke="#93C5FD"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M70 70l16 16"
                  stroke="#2563EB"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <circle cx="52" cy="52" r="8" fill="#DBEAFE" />
                <rect
                  x="80"
                  y="78"
                  width="18"
                  height="7"
                  rx="3.5"
                  fill="#2563EB"
                  transform="rotate(45 80 78)"
                />
              </svg>
              <p className="max-w-xs font-primary text-sm leading-relaxed text-content-light">
                We found no projects that matched these criteria, try reducing
                the number of filters or changing the keywords.
              </p>
            </div>
          )}
        </div>

        {/* Desktop filter panel — beside grid */}
        {filterOpen && (
          <div className="hidden w-full shrink-0 lg:block lg:w-[30%] lg:sticky lg:top-24">
            <IdeasFilterPanel
              filters={stagedFilters}
              onChange={setStagedFilters}
              onApply={handleApply}
              onCancel={handleCancel}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectsIdeasSection;
