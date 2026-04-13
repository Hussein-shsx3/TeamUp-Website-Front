"use client";

import { ChevronDown, Eye, Search } from "lucide-react";
import { Button, IconButton } from "@/components/ui/buttons";
import { Heading } from "@/components/ui/typography";
import type { AdminUserDetailRecord, AdminUserPostedIdeaRecord } from "@/mock/AdminUsers";
import UserDetailsAcademicCard from "./UserDetailsAcademicCard";
import UserDetailsPageHeader from "./UserDetailsPageHeader";
import UserDetailsProfileCard from "./UserDetailsProfileCard";
import UserDetailPill from "./UserDetailPill";

interface GraduateDetailsViewProps {
  user: AdminUserDetailRecord;
  onApprove?: () => void;
  onReject?: () => void;
}

const statusClasses: Record<AdminUserPostedIdeaRecord["status"], string> = {
  Pending: "bg-amber-100 text-amber-500",
  Approved: "bg-emerald-100 text-emerald-500",
  Rejected: "bg-rose-100 text-rose-500",
};

const GraduateDetailsView = ({ user, onApprove, onReject }: GraduateDetailsViewProps) => {
  const postedIdeas = user.postedIdeas ?? [];

  return (
    <div className="flex flex-col">
      <UserDetailsPageHeader userName={user.name} onApprove={onApprove} onReject={onReject} />

      <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)] lg:grid-cols-[320px_minmax(0,1fr)] lg:p-5">
        <UserDetailsProfileCard user={user} roleLabel="Graduate" roleTone="warning" />

        <div className="space-y-4">
          <UserDetailsAcademicCard
            university={user.university}
            major={user.major}
            joinedTeam={user.joinedTeam}
            rightLabel="Area of Expertise"
            rightContent={(
              <div className="flex flex-wrap gap-2">
                {(user.skills.length ? user.skills : []).map((skill) => (
                  <span key={skill} className="rounded bg-primary-light px-2.5 py-1 font-primary text-[11px] text-primary">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          />

          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <Heading level="h4" className="font-semibold text-content">
                Posted Idea
              </Heading>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="relative block w-full sm:w-[180px]">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
                  <input
                    type="search"
                    placeholder="Search"
                    className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 font-primary text-sm text-content outline-none transition-colors placeholder:text-slate-300 focus:border-primary"
                  />
                </label>

                <button
                  type="button"
                  className="inline-flex h-10 items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-content"
                >
                  <span>All</span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-[720px] w-full border-collapse bg-white">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-left font-primary text-xs text-slate-400">
                    <th className="w-12 px-4 py-3">
                      <span className="sr-only">Select</span>
                    </th>
                    <th className="px-4 py-3 font-normal">Idea Title</th>
                    <th className="px-4 py-3 font-normal">Status</th>
                    <th className="px-4 py-3 font-normal">Date</th>
                    <th className="px-4 py-3 text-center font-normal">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {postedIdeas.map((idea, index) => (
                    <tr key={`${idea.title}-${index}`} className="border-b border-slate-100 last:border-b-0">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          defaultChecked={idea.selected}
                          className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                        />
                      </td>
                      <td className="px-4 py-3 font-primary text-sm text-content">{idea.title}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 font-primary text-[11px] ${statusClasses[idea.status]}`}
                        >
                          {idea.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-primary text-sm text-slate-500">{idea.date}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2 text-slate-400">
                          <button type="button" aria-label={`View ${idea.title}`} className="rounded-full p-1 hover:bg-slate-100 hover:text-slate-600">
                            <Eye className="h-4 w-4" />
                          </button>
                          <IconButton
                            type="button"
                            variant="ghost"
                            size="sm"
                            aria-label={`More actions for ${idea.title}`}
                            className="rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                          >
                            ⋮
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <span>Show result :</span>
                <button
                  type="button"
                  className="inline-flex h-8 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 font-primary text-sm text-content"
                >
                  5
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button type="button" className="rounded-full px-2 py-1 text-slate-400 hover:bg-slate-100 hover:text-content">
                  ‹
                </button>
                <button type="button" className="rounded-full px-2 py-1 text-slate-400 hover:bg-slate-100 hover:text-content">
                  1
                </button>
                <button type="button" className="rounded-full bg-primary-light px-3 py-1 font-medium text-primary">
                  2
                </button>
                <button type="button" className="rounded-full px-2 py-1 text-slate-400 hover:bg-slate-100 hover:text-content">
                  3
                </button>
                <button type="button" className="rounded-full px-2 py-1 text-slate-400 hover:bg-slate-100 hover:text-content">
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GraduateDetailsView;