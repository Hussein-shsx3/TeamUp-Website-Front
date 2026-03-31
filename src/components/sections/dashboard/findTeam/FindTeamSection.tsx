"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { Search, Filter, ChevronDown, X, ArrowUpDown } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/buttons";
import { Heading } from "@/components/ui/typography";
import { CreateProjectTeamModal } from "@/components/sections/dashboard/createProject";
import { FIND_TEAM_PROJECTS, FIND_TEAM_SORT_OPTIONS } from "@/mock/FindTeam";
import FindTeamProjectCard from "./FindTeamProjectCard";
import FindTeamFilterPanel, { FindTeamFilters } from "./FindTeamFilterPanel";
import Image from "next/image";

const EMPTY_FILTERS: FindTeamFilters = {
  category: "",
  availableRole: "",
  requiredSkills: [],
  teamStatus: "",
};

function buildActiveChips(filters: FindTeamFilters, search: string) {
  const chips: { key: string; label: string }[] = [];
  if (search.trim()) chips.push({ key: "search", label: `"${search.trim()}"` });
  if (filters.category)
    chips.push({ key: "category", label: `${filters.category}` });
  if (filters.availableRole)
    chips.push({
      key: "availableRole",
      label: `${filters.availableRole}`,
    });
  filters.requiredSkills.forEach((s, i) =>
    chips.push({ key: `skill-${i}`, label: `${s}` }),
  );
  if (filters.teamStatus)
    chips.push({ key: "teamStatus", label: `${filters.teamStatus}` });
  return chips;
}

const FindTeamSection = () => {
  const [search, setSearch] = useState("");
  const [sortValue, setSortValue] = useState("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const [stagedFilters, setStagedFilters] =
    useState<FindTeamFilters>(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] =
    useState<FindTeamFilters>(EMPTY_FILTERS);

  const sortRef = useRef<HTMLDivElement>(null);

  /* Close sort dropdown on outside click */
  useEffect(() => {
    if (!sortOpen) return;
    const handler = (e: MouseEvent) => {
      if (!sortRef.current?.contains(e.target as Node)) setSortOpen(false);
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
    else if (key === "availableRole") next.availableRole = "";
    else if (key === "teamStatus") next.teamStatus = "";
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

  const filteredProjects = useMemo(() => {
    let list = [...FIND_TEAM_PROJECTS];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.lookingFor.some((t) => t.toLowerCase().includes(q)),
      );
    }
    if (appliedFilters.category)
      list = list.filter((p) => p.category === appliedFilters.category);
    if (appliedFilters.availableRole)
      list = list.filter((p) =>
        p.lookingFor.includes(appliedFilters.availableRole),
      );
    if (appliedFilters.requiredSkills.length)
      list = list.filter((p) =>
        appliedFilters.requiredSkills.every((s) => p.lookingFor.includes(s)),
      );
    if (appliedFilters.teamStatus)
      list = list.filter((p) => p.status === appliedFilters.teamStatus);
    return list;
  }, [search, appliedFilters]);

  const currentSortLabel =
    FIND_TEAM_SORT_OPTIONS.find((o) => o.value === sortValue)?.label ??
    "Newest";

  return (
    <>
      {/* ── Page Header ── */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Heading level="h3" className="font-bold text-content-light">
            Explore Graduation Projects
          </Heading>
          <p className="mt-1 font-primary text-sm text-content-light">
            Join the right team and share your skills
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2 sm:gap-3">
          <Button
            type="button"
            variant="primary"
            size="md"
            className="flex-1 justify-center sm:flex-none"
            onClick={() => setCreateOpen(true)}
          >
            Create Team
          </Button>
          <LinkButton
            href="/dashboard/find-team/my-requests"
            variant="secondary"
            size="md"
            className="flex-1 justify-center sm:flex-none"
          >
            View my Requests
          </LinkButton>
        </div>
      </div>

      {/* ── Toolbar: search full-width + right buttons ── */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2">
        {/* Search — full width on mobile, grows to fill remaining space on desktop */}
        <div className="relative w-full min-w-0 flex-1">
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
            aria-label="Search projects"
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-4
              font-primary text-sm text-content placeholder:text-content-muted
              focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15
              transition-colors"
          />
        </div>
        {/* Buttons container — stacked on mobile (full-width), inline on desktop */}
        <div className="flex flex-col sm:flex-row w-full gap-2 sm:w-auto sm:flex-none items-center">
          {/* Filter button — full width on mobile */}
          <button
            type="button"
            onClick={() => setFilterOpen((o) => !o)}
            className={`inline-flex w-full sm:w-auto shrink-0 items-center gap-2 rounded-lg border px-4 py-2.5
              font-primary text-sm transition-colors duration-150 whitespace-nowrap
              ${
                filterOpen
                  ? " bg-primary-light text-primary"
                  : "bg-white text-content-light hover:border-primary/40 hover:bg-primary-light/30"
              }`}
          >
            <Filter size={17} aria-hidden="true" />
            Filter
          </button>

          {/* Sort dropdown — full width on mobile, keeps dropdown aligned on desktop */}
          <div ref={sortRef} className="relative shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setSortOpen((o) => !o)}
              className={`inline-flex w-full sm:w-auto sm:min-w-[7.5rem] items-center gap-2 rounded-lg border
                px-3 py-2.5 font-primary text-sm transition-colors duration-150
                whitespace-nowrap
                ${
                  sortOpen
                    ? "border-primary bg-primary-light text-primary"
                    : "border-primary bg-white text-primary"
                }`}
            >
              {/* Sort icon matching the design */}
              <ArrowUpDown size={14} aria-hidden="true" className="shrink-0" />
              <span className="flex-1 text-left">{currentSortLabel}</span>
              <ChevronDown
                size={14}
                className={`shrink-0 transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            {/* Dropdown — fixed width matching button on mobile (min full width), aligned on desktop */}
            {sortOpen && (
              <div
                className="absolute right-0 top-[calc(100%+4px)] z-30 min-w-full sm:min-w-[7.5rem]
                  border border-gray-100 bg-white shadow-lg"
              >
                {FIND_TEAM_SORT_OPTIONS.map((opt) => (
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

      {/* ── Active filter chips row ── */}
      {hasActiveFilters && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {/* Search chip */}
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
                className="inline-flex items-center gap-1 rounded-md
                bg-primary-light px-3 py-1 font-primary text-xs font-medium text-primary"
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
      {hasActiveFilters && filteredProjects.length > 0 && (
        <p className="mb-4 font-primary text-sm font-medium text-content-light">
          {filteredProjects.length} Result
          {filteredProjects.length !== 1 ? "s" : ""} founded
        </p>
      )}

      {/* ── Main content: grid + optional side filter panel ── */}
      <div
        className={`flex gap-5 items-start ${filterOpen ? "flex-col lg:flex-row" : ""}`}
      >
        {/* Mobile-only filter panel: show above cards when open on small screens */}
        {filterOpen && (
          <div className="w-full lg:hidden">
            <FindTeamFilterPanel
              filters={stagedFilters}
              onChange={setStagedFilters}
              onApply={handleApplyFilter}
              onCancel={handleCancelFilter}
            />
          </div>
        )}

        {/* Cards grid — 3 cols normally, 2 cols when filter is open */}
        <div className="min-w-0 flex-1">
          {filteredProjects.length > 0 ? (
            <div
              className={`grid grid-cols-1 gap-4 sm:gap-5
                ${
                  filterOpen
                    ? "sm:grid-cols-2"
                    : "sm:grid-cols-2 lg:grid-cols-3"
                }`}
            >
              {filteredProjects.map((project) => (
                <FindTeamProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
              <Image
                src="/images/noResults.svg"
                alt="No results"
                width={220}
                height={220}
              />
              <p className="font-primary text-sm text-content-light max-w-lg leading-relaxed">
                We found no projects that matched these criteria, try reducing
                the number of filters or changing the keywords.
              </p>
            </div>
          )}
        </div>

        {/* Filter panel — inline beside grid on desktop, below toolbar on mobile */}
        {filterOpen && (
          <div className="hidden lg:block w-full shrink-0 lg:w-[30%] lg:sticky lg:top-24">
            <FindTeamFilterPanel
              filters={stagedFilters}
              onChange={setStagedFilters}
              onApply={handleApplyFilter}
              onCancel={handleCancelFilter}
            />
          </div>
        )}
      </div>

      <CreateProjectTeamModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </>
  );
};

export default FindTeamSection;
