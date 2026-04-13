"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, MoreVertical } from "lucide-react";
import { Breadcrumb } from "@/components/ui/navigation";
import { Heading } from "@/components/ui/typography";
import { type AdminTeamDetailRecord } from "@/mock/AdminTeams";
import TeamStatusBadge from "../TeamStatusBadge";

interface AdminTeamDetailsViewProps {
  team: AdminTeamDetailRecord;
}

const chipClasses =
  "inline-flex items-center rounded-full bg-primary/10 px-3 py-1 font-primary text-[11px] font-medium text-primary";

const AdminTeamDetailsView = ({ team }: AdminTeamDetailsViewProps) => {
  const membersTable = team.membersTable;

  return (
    <div className="flex flex-col">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Teams", href: "/admin/teams" },
          { label: "Team Details" },
        ]}
      />

      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Heading level="h4" className="text-[28px] font-semibold text-content sm:text-[30px]">
              {team.teamName}
            </Heading>
            <TeamStatusBadge status={team.status} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="rounded-lg bg-primary px-4 py-2 font-primary text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            Go to Work space
          </button>
          <button
            type="button"
            className="rounded-lg border border-rose-200 bg-white px-4 py-2 font-primary text-sm font-medium text-rose-500 transition-colors hover:border-rose-300 hover:text-rose-600"
          >
            Reject
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section className="space-y-5 rounded-lg border border-slate-200 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
          <div>
            <Heading level="h5" className="text-lg font-semibold text-content">
              Project Description
            </Heading>
            <p className="mt-3 max-w-3xl font-primary text-sm leading-relaxed text-slate-500">
              {team.description}
            </p>
          </div>

          <div>
            <Heading level="h6" className="text-lg font-semibold text-content">
              Tech Stack
            </Heading>
            <div className="mt-3 flex flex-wrap gap-2">
              {team.techStack.map((item, index) => (
                <span key={`${item}-${index}`} className={chipClasses}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <Heading level="h6" className="text-lg font-semibold text-content-light">
              Roles Needed
            </Heading>
            <div className="mt-3 flex flex-wrap gap-2">
              {team.rolesNeeded.map((item, index) => (
                <span key={`${item}-${index}`} className={chipClasses}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between font-primary text-sm text-slate-500">
              <span>Project Completion</span>
              <span className="font-semibold text-content">{team.completion}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: `${team.completion}%` }}
                aria-hidden="true"
              />
            </div>
          </div>
        </section>

        <aside className="rounded-lg border border-slate-200 bg-gray-50 p-5 text-center shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
          <div className="mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-primary/15">
            <Image
              src={team.mentorAvatar}
              alt={team.teamMentor}
              width={96}
              height={96}
              unoptimized
              className="h-full w-full object-cover"
            />
          </div>

          <Heading level="h4" className="mt-8 text-xl font-semibold text-content-light">
            {team.teamMentor}
          </Heading>

          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 font-primary text-sm font-medium text-emerald-600">
              {team.mentorRole}
            </span>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 font-primary text-sm font-medium text-emerald-600">
              {team.mentorStatus}
            </span>
          </div>

          <Link
            href={team.mentorHref}
            className="mt-3 inline-flex items-center gap-2 font-primary text-sm text-primary transition-colors hover:text-primary/80"
          >
            View Profile
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </aside>
      </div>

      <section className="mt-5 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <Heading level="h5" className="text-lg font-semibold text-content-light">
              Members Table
            </Heading>
            <p className="font-primary text-xs text-primary/70">{team.membersCountLabel}</p>
          </div>

          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Search by name or email"
              aria-label="Search team members"
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 font-primary text-sm text-content placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[760px] w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/80 text-left font-primary text-[11px] uppercase tracking-wide text-slate-400">
                <th className="w-12 border-b border-slate-100 px-4 py-4">
                  <input
                    type="checkbox"
                    aria-label="Select all team members"
                    className="h-4 w-4 cursor-pointer rounded border-slate-300 text-primary accent-primary focus:ring-primary"
                  />
                </th>
                <th className="border-b border-slate-100 px-4 py-4">Name</th>
                <th className="border-b border-slate-100 px-4 py-4">Status</th>
                <th className="border-b border-slate-100 px-4 py-4">Role</th>
                <th className="border-b border-slate-100 px-4 py-4">Join Date</th>
                <th className="border-b border-slate-100 px-4 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {membersTable.map((member) => (
                <tr key={member.name} className="text-sm text-content transition-colors hover:bg-slate-50/80">
                  <td className="border-b border-slate-100 px-4 py-4 align-middle">
                    <input
                      type="checkbox"
                      aria-label={`Select ${member.name}`}
                      className="h-4 w-4 cursor-pointer rounded border-slate-300 text-primary accent-primary focus:ring-primary"
                    />
                  </td>
                  <td className="border-b border-slate-100 px-4 py-4 align-middle">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          fill
                          unoptimized
                          className="object-cover"
                          sizes="32px"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-primary text-sm font-medium text-content-light">{member.name}</p>
                        <p className="truncate font-primary text-xs text-slate-500">example@gmail.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-slate-100 px-4 py-4 align-middle">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 font-primary text-[11px] font-semibold text-emerald-600 ring-1 ring-emerald-100">
                      {member.status}
                    </span>
                  </td>
                  <td className="border-b border-slate-100 px-4 py-4 align-middle font-primary text-sm text-slate-600">
                    {member.role}
                  </td>
                  <td className="border-b border-slate-100 px-4 py-4 align-middle font-primary text-sm text-slate-600">
                    {member.joinDate}
                  </td>
                  <td className="border-b border-slate-100 px-4 py-4 text-right align-middle">
                    <div className="inline-flex items-center gap-1">
                      <Link
                        href={`/admin/users/${member.id}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                        aria-label={`View ${member.name}`}
                      >
                        <Eye size={16} aria-hidden="true" />
                      </Link>
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                        aria-label={`More actions for ${member.name}`}
                      >
                        <MoreVertical size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminTeamDetailsView;