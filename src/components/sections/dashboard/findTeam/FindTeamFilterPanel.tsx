"use client";
import { X } from "lucide-react";
import { Button } from "@/components/ui/buttons";
import { Select } from "@/components/ui/forms";
import TagInput from "@/components/ui/forms/TagInput";
import {
  FIND_TEAM_CATEGORY_OPTIONS,
  FIND_TEAM_ROLE_OPTIONS,
  FIND_TEAM_STATUS_OPTIONS,
} from "@/mock/FindTeam";

export interface FindTeamFilters {
  category: string;
  availableRole: string;
  requiredSkills: string[];
  teamStatus: string;
}

interface FindTeamFilterPanelProps {
  filters: FindTeamFilters;
  onChange: (filters: FindTeamFilters) => void;
  onApply: () => void;
  onCancel: () => void;
}

const FindTeamFilterPanel = ({
  filters,
  onChange,
  onApply,
  onCancel,
}: FindTeamFilterPanelProps) => {
  const set = <K extends keyof FindTeamFilters>(
    key: K,
    value: FindTeamFilters[K],
  ) => onChange({ ...filters, [key]: value });

  return (
    <div
      className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.10)]
        w-full"
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <p className="font-primary text-lg font-medium text-content">
          Filter
        </p>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close filter"
          className="flex h-7 w-7 items-center justify-center rounded-full text-content-muted
            hover:bg-gray-100 hover:text-content transition-colors duration-150"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {/* Project Category */}
        <Select
          id="filter-category"
          label="Project Category"
          options={FIND_TEAM_CATEGORY_OPTIONS}
          value={filters.category}
          onChange={(e) => set("category", e.target.value)}
        />

        {/* Available Roles */}
        <Select
          id="filter-role"
          label="Available Roles"
          options={FIND_TEAM_ROLE_OPTIONS}
          value={filters.availableRole}
          onChange={(e) => set("availableRole", e.target.value)}
        />

        {/* Required Skills */}
        <TagInput
          id="filter-skills"
          label="Required Skills"
          value={filters.requiredSkills}
          onChange={(tags) => set("requiredSkills", tags)}
          placeholder="Add skill…"
          variant="bordered"
        />

        {/* Team Status */}
        <Select
          id="filter-status"
          label="Team Status"
          options={FIND_TEAM_STATUS_OPTIONS}
          value={filters.teamStatus}
          onChange={(e) => set("teamStatus", e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <Button
          type="button"
          variant="primary"
          size="md"
          className="flex-1"
          onClick={onApply}
        >
          Apply
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="md"
          className="flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default FindTeamFilterPanel;
