"use client";
import { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/navigation";
import { Button } from "@/components/ui/buttons";
import { Heading } from "@/components/ui/typography";
import { TeamMemberRow } from "@/components/ui/team";
import JoinTeamModal from "@/components/sections/dashboard/findTeam/JoinTeamModal";
import { useFindTeamProject } from "@/hooks/useFindTeam";

interface ProjectDetailPageProps {
  id: string;
}

const ProjectDetailPage = ({ id }: ProjectDetailPageProps) => {
  const { project, projectQuery, teamDetailsQuery } = useFindTeamProject(id);

  const [joinOpen, setJoinOpen] = useState(false);

  if (projectQuery.isError || teamDetailsQuery.isError) return notFound();
  if (projectQuery.isLoading || teamDetailsQuery.isLoading || !project) {
    return (
      <div className="rounded-lg border border-gray-100 bg-white p-6 font-primary text-sm text-content-light shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        Loading project details...
      </div>
    );
  }

  const {
    name,
    description,
    fullDescription,
    image,
    teamCapacity,
    currentMembers,
    lookingFor,
    techStack,
    status,
    mentorName,
    supervisorName,
    postDate,
    members,
  } = project;

  const isFull = status === "Full";

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Main Student Dashboard", href: "/dashboard" },
          { label: "Find a team", href: "/dashboard/find-team" },
          { label: "Project name" },
        ]}
      />

      {/* ── Two-column layout ── */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
        {/* ── LEFT column ── */}
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          {/* Project header card */}
          <div
            className="overflow-hidden rounded-lg border border-gray-100 bg-white
            shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Thumbnail */}
              <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-48 md:w-56">
                <Image
                  src={image}
                  alt={name}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 224px"
                />
              </div>

              {/* Info */}
              <div className="flex min-w-0 flex-1 flex-col gap-3 p-5 md:p-7">
                {/* Title + status badge */}
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <Heading
                    level="h4"
                    className="font-semibold text-content-light"
                  >
                    {name}
                  </Heading>
                  <span
                    className="shrink-0 rounded-md border border-primary px-3 py-1
                      font-primary text-xs font-semibold text-primary"
                  >
                    {status}
                  </span>
                </div>

                {/* Short description */}
                <p className="max-w-xl font-primary text-sm leading-relaxed text-content-light">
                  {description}
                </p>

                {/* Mentor + Post Date + CTA */}
                <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
                  {/* Mentor */}
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-gray-100">
                      <Image
                        src="/images/user.png"
                        alt={mentorName}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <p className="font-primary text-sm text-content-light">
                        {mentorName}
                      </p>
                      <p className="font-primary text-xs text-content-light">
                        Supervisor by {supervisorName}
                      </p>
                    </div>
                  </div>

                  <span className="w-0.5 bg-gray-200 h-8"></span>

                  {/* Post Date */}
                  <div>
                    <p className="font-primary text-sm text-content-light">
                      Post Date
                    </p>
                    <p className="font-primary text-xs text-content-light">
                      {postDate}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="ml-auto">
                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      disabled={isFull}
                      onClick={() => setJoinOpen(true)}
                      className="md:px-7"
                    >
                      {isFull ? "Team is Full" : "Request to join"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description + Tech Stack card */}
          <div
            className="rounded-lg border border-gray-100 bg-white p-5 sm:p-6
            shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
          >
            <Heading level="h4" className="font-semibold text-content">
              Project Description
            </Heading>
            <p className="max-w-2xl mt-3 font-primary text-sm leading-relaxed text-content-light">
              {fullDescription}
            </p>

            <Heading level="h5" className="mt-6 font-semibold text-content">
              Tech Stack
            </Heading>
            <div className="mt-3 flex flex-wrap gap-2">
              {techStack.map((tech, i) => (
                <span
                  key={i}
                  className="rounded-md bg-primary-light px-3 py-1 font-primary
                    text-xs font-medium text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT column ── */}
        <div className="w-full shrink-0 lg:sticky lg:top-24 lg:w-72 xl:w-80">
          <div
            className="rounded-lg border border-gray-100 bg-white p-5
            shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
          >
            {/* Team Member header */}
            <div className="mb-4 flex items-center justify-between">
              <Heading level="h5" className="font-semibold text-content-light">
                Team Member
              </Heading>
              <span className="font-primary text-sm font-medium text-content-light">
                {currentMembers}/{teamCapacity}
              </span>
            </div>

            {/* Member list — reuses TeamMemberRow */}
            <div className="flex flex-col">
              {members.map((m) => (
                <TeamMemberRow
                  key={m.id}
                  name={m.name}
                  role={m.role}
                  avatarSrc={m.avatar}
                />
              ))}
            </div>

            {/* Roles Needed */}
            <div className="mt-6 border-t border-gray-100 pt-5">
              <p className="mb-3 font-primary text-sm font-medium text-content-light">
                Roles Needed
              </p>
              <div className="flex flex-wrap gap-2">
                {lookingFor.map((role, i) => (
                  <span
                    key={i}
                    className="rounded-md bg-primary-light px-3 py-1 font-primary
                      text-xs font-medium text-primary"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Join modal */}
      <JoinTeamModal
        isOpen={joinOpen}
        onClose={() => setJoinOpen(false)}
        projectName={name}
        projectId={id}
        teamId={project.teamId}
      />
    </>
  );
};

export default ProjectDetailPage;
