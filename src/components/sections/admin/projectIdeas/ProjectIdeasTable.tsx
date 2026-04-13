"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import type { AdminProjectIdeaRecord } from "@/mock/ProjectsIdeas";
import ProjectIdeaActionsMenu from "./ProjectIdeaActionsMenu";
import ProjectIdeaStatusBadge from "./ProjectIdeaStatusBadge";

interface ProjectIdeasTableProps {
  ideas: AdminProjectIdeaRecord[];
  selectedIds: Set<number>;
  onToggleIdea: (id: number) => void;
  onToggleSelectAll: (ideaIds: number[]) => void;
  onToggleSort: () => void;
  sortDirection: "asc" | "desc";
  onApprove: (idea: AdminProjectIdeaRecord) => void;
  onReject: (idea: AdminProjectIdeaRecord) => void;
  onDisable: (idea: AdminProjectIdeaRecord) => void;
  onEnable: (idea: AdminProjectIdeaRecord) => void;
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

const ProjectIdeasTable = ({
  ideas,
  selectedIds,
  onToggleIdea,
  onToggleSelectAll,
  onToggleSort,
  sortDirection,
  onApprove,
  onReject,
  onDisable,
  onEnable,
}: ProjectIdeasTableProps) => {
  const selectAllRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const allSelected = ideas.length > 0 && ideas.every((idea) => selectedIds.has(idea.id));
  const someSelected = ideas.some((idea) => selectedIds.has(idea.id));

  useEffect(() => {
    if (!selectAllRef.current) return;
    selectAllRef.current.indeterminate = someSelected && !allSelected;
  }, [allSelected, someSelected]);

  const ideaIds = useMemo(() => ideas.map((idea) => idea.id), [ideas]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-[960px] w-full border-separate border-spacing-0">
        <thead>
          <tr className="bg-slate-50/80 text-left font-primary text-[11px] uppercase tracking-wide text-slate-400">
            <th className="w-12 border-b border-slate-100 px-4 py-4">
              <input
                ref={selectAllRef}
                type="checkbox"
                checked={allSelected}
                onChange={() => onToggleSelectAll(ideaIds)}
                aria-label="Select all project ideas on the current page"
                className="h-4 w-4 cursor-pointer rounded border-slate-300 text-primary accent-primary focus:ring-primary"
              />
            </th>
            <th className="border-b border-slate-100 px-4 py-4">Idea Title</th>
            <th className="border-b border-slate-100 px-4 py-4">Type</th>
            <th className="border-b border-slate-100 px-4 py-4">Submitted By</th>
            <th className="border-b border-slate-100 px-4 py-4">Status</th>
            <th className="border-b border-slate-100 px-4 py-4">
              <button
                type="button"
                onClick={onToggleSort}
                className="inline-flex items-center gap-1 text-left transition-colors hover:text-slate-600"
                aria-label={`Sort by date ${sortDirection === "desc" ? "descending" : "ascending"}`}
              >
                Date
                <ArrowUpDown size={12} aria-hidden="true" className="shrink-0" />
              </button>
            </th>
            <th className="border-b border-slate-100 px-4 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {ideas.map((idea) => {
            const isSelected = selectedIds.has(idea.id);
            const openIdeaDetails = () => router.push(`/admin/project-ideas/${idea.id}`);

            return (
              <tr
                key={idea.id}
                className={`cursor-pointer text-sm text-content transition-colors hover:bg-slate-50/80 ${
                  isSelected ? "bg-primary/5" : ""
                }`}
                role="link"
                tabIndex={0}
                onClick={openIdeaDetails}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openIdeaDetails();
                  }
                }}
              >
                <td className="border-b border-slate-100 px-4 py-4 align-middle">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onClick={(event) => event.stopPropagation()}
                    onChange={(event) => {
                      event.stopPropagation();
                      onToggleIdea(idea.id);
                    }}
                    aria-label={`Select ${idea.name}`}
                    className="h-4 w-4 cursor-pointer rounded border-slate-300 text-primary accent-primary focus:ring-primary"
                  />
                </td>
                <td className="border-b border-slate-100 px-4 py-4 font-primary text-sm font-medium text-content align-middle">
                  {idea.name}
                </td>
                <td className="border-b border-slate-100 px-4 py-4 align-middle">
                  <span className="font-primary text-sm text-slate-600">
                    {idea.price === "paid"
                      ? `Paid`
                      : "Free"}
                  </span>
                </td>
                <td className="border-b border-slate-100 px-4 py-4 align-middle">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                      <Image
                        src={idea.mentorAvatar}
                        alt={idea.submittedBy}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-primary text-sm font-medium text-content">
                        {idea.submittedBy}
                      </p>
                      <p className="truncate font-primary text-xs text-slate-500">Student</p>
                    </div>
                  </div>
                </td>
                <td className="border-b border-slate-100 px-4 py-4 align-middle">
                  <ProjectIdeaStatusBadge status={idea.status} />
                </td>
                <td className="border-b border-slate-100 px-4 py-4 font-primary text-sm text-slate-600 align-middle">
                  {formatDate(idea.postedAt)}
                </td>
                <td className="border-b border-slate-100 px-4 py-4 text-right align-middle">
                  <div className="inline-flex justify-end" onClick={(event) => event.stopPropagation()}>
                    <ProjectIdeaActionsMenu
                      idea={idea}
                      onApprove={onApprove}
                      onReject={onReject}
                      onDisable={onDisable}
                      onEnable={onEnable}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {ideas.length === 0 ? (
        <div className="border-b border-slate-100 px-4 py-16 text-center font-primary text-sm text-slate-500">
          No project ideas found for the current search and filter settings.
        </div>
      ) : null}
    </div>
  );
};

export default ProjectIdeasTable;