"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MoreVertical, PencilLine, Trash2 } from "lucide-react";
import { LinkButton } from "@/components/ui/buttons";
import { IconButton } from "@/components/ui/buttons";
import { ProgressBar } from "@/components/ui/feedback";
import { DeleteProjectIdeaModal } from "@/components/ui/modals";
import { Heading } from "@/components/ui/typography";
import type {
  MockMentorIdeaCard,
  MockMentorSupervisedProject,
} from "@/mock/Dashboard";

type MentorProjectCardProps =
  | { variant: "supervise"; project: MockMentorSupervisedProject }
  | { variant: "idea"; project: MockMentorIdeaCard };

const MentorProjectCard = (props: MentorProjectCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.variant !== "idea" || !menuOpen) return;

    const handleDocumentClick = (event: MouseEvent) => {
      if (menuRef.current?.contains(event.target as Node)) return;
      setMenuOpen(false);
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, [menuOpen, props.variant]);

  if (props.variant === "supervise") {
    const { project } = props;

    return (
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
        <div className="relative h-60 w-full">
          <Image
            src={project.image}
            alt={project.name}
            fill
            unoptimized
            className="object-cover"
          />
          <span className="absolute right-3 top-3 rounded-full border border-primary/20 bg-white px-2.5 py-1 font-primary text-xs font-medium text-primary shadow-sm">
            {project.status}
          </span>
        </div>

        <div className="flex flex-col gap-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Heading level="h4" className="font-semibold leading-tight text-content">
                {project.name}
              </Heading>
              <p className="mt-0.5 font-primary text-xs text-content-light">
                Supervisor by {project.supervisor}
              </p>
            </div>

            <div className="flex flex-shrink-0 items-center">
              <div className="flex -space-x-2">
                {project.members.map((member) => (
                  <div
                    key={member.id}
                    className="relative h-7 w-7 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-white"
                  >
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              {project.extraMembers > 0 && (
                <span className="ml-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary font-primary text-[10px] font-bold text-white ring-2 ring-white">
                  +{project.extraMembers}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <p className="font-primary text-xs text-content-light">
                Project Completion
              </p>
              <p className="font-primary text-xs font-semibold text-content">
                {project.completion}%
              </p>
            </div>
            <ProgressBar value={project.completion} />
          </div>

          <LinkButton
            href={project.workspaceHref}
            variant="primary"
            size="md"
            className="w-fit"
            prefetch
          >
            Go to project workspace
          </LinkButton>
        </div>
      </div>
    );
  }

  const { project } = props;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Heading level="h5" className="font-semibold leading-tight text-content-light">
            {project.title}
          </Heading>
          <p className="my-3 max-w-3xl font-primary text-sm leading-relaxed text-content-light">
            {project.description}
          </p>
        </div>

        <div
          ref={menuRef}
          className="relative flex flex-shrink-0 items-center gap-2"
        >
          <span className="rounded-md border border-primary px-2.5 py-0.5 font-primary text-xs font-medium text-primary">
            {project.badgeLabel}
          </span>
          <div className="relative">
            <IconButton
              type="button"
              variant="ghost"
              size="sm"
              aria-label={`Actions for ${project.title}`}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <MoreVertical className="text-content-light" />
            </IconButton>

            {menuOpen ? (
              <div
                className="absolute right-0 z-20 mt-1 w-40 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg"
                role="menu"
              >
                <Link
                  href={project.editHref}
                  className="flex items-center gap-2 px-3 py-3 font-primary text-xs text-content hover:bg-gray-50"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  <PencilLine className="h-3.5 w-3.5 text-content-light" />
                  Edit
                </Link>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-3 font-primary text-xs text-error hover:bg-error/5"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    setDeleteModalOpen(true);
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-3">
        <LinkButton
          href={project.viewHref}
          variant="primary"
          size="md"
          className="md:w-[30%]"
        >
          View Details
        </LinkButton>
        <LinkButton
          href={project.editHref}
          variant="secondary"
          size="md"
          className="md:w-[30%]"
        >
          Edit Idea
        </LinkButton>
      </div>

      <DeleteProjectIdeaModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          console.log("delete mentor idea (mock)");
          setDeleteModalOpen(false);
        }}
        projectName={project.title}
      />
    </div>
  );
};

export default MentorProjectCard;
