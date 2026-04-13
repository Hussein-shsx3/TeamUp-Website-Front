"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Eye, Search } from "lucide-react";
import { IconButton } from "@/components/ui/buttons";
import { Heading } from "@/components/ui/typography";
import type {
  AdminUserDetailRecord,
  AdminUserPostedIdeaRecord,
  AdminUserSupervisedProjectRecord,
} from "@/mock/AdminUsers";
import UserDetailsAcademicCard from "./UserDetailsAcademicCard";
import UserDetailsPageHeader from "./UserDetailsPageHeader";
import UserDetailsProfileCard from "./UserDetailsProfileCard";
import UserDetailsStatCard from "./UserDetailsStatCard";

interface MentorDetailsViewProps {
  user: AdminUserDetailRecord;
  onApprove?: () => void;
  onReject?: () => void;
}

type MentorTab = "supervise" | "ideas";
type SuperviseFilter = "All" | AdminUserSupervisedProjectRecord["status"];
type IdeasFilter = "All" | AdminUserPostedIdeaRecord["status"];

const PAGE_SIZE_OPTIONS = [5, 10, 15] as const;

const ideaStatusClasses: Record<AdminUserPostedIdeaRecord["status"], string> = {
  Pending: "bg-amber-100 text-amber-500",
  Approved: "bg-emerald-100 text-emerald-500",
  Rejected: "bg-rose-100 text-rose-500",
};

const projectStatusClasses: Record<AdminUserSupervisedProjectRecord["status"], string> = {
  Completed: "bg-emerald-100 text-emerald-500",
  "In Progress": "bg-blue-100 text-blue-500",
};

const MentorDetailsView = ({ user, onApprove, onReject }: MentorDetailsViewProps) => {
  const [activeTab, setActiveTab] = useState<MentorTab>("supervise");
  const [superviseSearch, setSuperviseSearch] = useState("");
  const [ideasSearch, setIdeasSearch] = useState("");
  const [superviseFilter, setSuperviseFilter] = useState<SuperviseFilter>("All");
  const [ideasFilter, setIdeasFilter] = useState<IdeasFilter>("All");
  const [supervisePageSize, setSupervisePageSize] = useState(5);
  const [ideasPageSize, setIdeasPageSize] = useState(5);
  const [supervisePage, setSupervisePage] = useState(1);
  const [ideasPage, setIdeasPage] = useState(1);

  const supervisedProjects = user.supervisedProjects ?? [];
  const postedIdeas = user.postedIdeas ?? [];

  const filteredSupervisedProjects = useMemo(() => {
    const query = superviseSearch.trim().toLowerCase();

    return supervisedProjects.filter((project) => {
      const matchesQuery =
        query.length === 0 ||
        project.teamName.toLowerCase().includes(query) ||
        project.members.some((member) => member.toLowerCase().includes(query));
      const matchesFilter = superviseFilter === "All" || project.status === superviseFilter;
      return matchesQuery && matchesFilter;
    });
  }, [superviseFilter, superviseSearch, supervisedProjects]);

  const filteredPostedIdeas = useMemo(() => {
    const query = ideasSearch.trim().toLowerCase();

    return postedIdeas.filter((idea) => {
      const matchesQuery = query.length === 0 || idea.title.toLowerCase().includes(query);
      const matchesFilter = ideasFilter === "All" || idea.status === ideasFilter;
      return matchesQuery && matchesFilter;
    });
  }, [ideasFilter, ideasSearch, postedIdeas]);

  const superviseTotalPages = Math.max(1, Math.ceil(filteredSupervisedProjects.length / supervisePageSize));
  const ideasTotalPages = Math.max(1, Math.ceil(filteredPostedIdeas.length / ideasPageSize));

  useEffect(() => {
    setSupervisePage((current) => Math.min(current, superviseTotalPages));
  }, [superviseTotalPages]);

  useEffect(() => {
    setIdeasPage((current) => Math.min(current, ideasTotalPages));
  }, [ideasTotalPages]);

  const paginatedSupervisedProjects = filteredSupervisedProjects.slice(
    (supervisePage - 1) * supervisePageSize,
    supervisePage * supervisePageSize,
  );

  const paginatedPostedIdeas = filteredPostedIdeas.slice(
    (ideasPage - 1) * ideasPageSize,
    ideasPage * ideasPageSize,
  );

  const renderPagination = (
    currentPage: number,
    totalPages: number,
    onPrevious: () => void,
    onNext: () => void,
    onChangePage: (page: number) => void,
  ) => (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="rounded-full px-2 py-1 text-slate-400 hover:bg-slate-100 hover:text-content disabled:cursor-not-allowed disabled:opacity-40"
      >
        ‹
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onChangePage(page)}
          className={`rounded-full px-2.5 py-1 font-medium ${
            currentPage === page ? "bg-primary-light text-primary" : "text-slate-400 hover:bg-slate-100 hover:text-content"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="rounded-full px-2 py-1 text-slate-400 hover:bg-slate-100 hover:text-content disabled:cursor-not-allowed disabled:opacity-40"
      >
        ›
      </button>
    </div>
  );

  return (
    <div className="flex flex-col">
      <UserDetailsPageHeader userName={user.name} onApprove={onApprove} onReject={onReject} />

      <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)] lg:grid-cols-[320px_minmax(0,1fr)] lg:p-5">
        <UserDetailsProfileCard user={user} roleLabel="Mentor" />

        <div className="space-y-4">
          <UserDetailsAcademicCard
            university={user.university}
            major={user.major}
            joinedTeam={user.joinedTeam}
            rightLabel="Area of Expertise"
            rightContent={
              <div className="flex flex-wrap gap-2">
                {(user.skills.length ? user.skills : []).map((skill) => (
                  <span key={skill} className="rounded bg-primary-light px-2.5 py-1 font-primary text-[11px] text-primary">
                    {skill}
                  </span>
                ))}
              </div>
            }
            footer={
              <div className="grid grid-cols-2 gap-3">
                <UserDetailsStatCard
                  iconSrc="/images/graduation-scroll.svg"
                  iconAlt="Active projects"
                  value={`${String(user.activeProjects ?? 0).padStart(2, "0")}`}
                  label="Active Projects"
                  accentClassName="bg-primary-light text-primary"
                />
                <UserDetailsStatCard
                  iconSrc="/images/file-02.svg"
                  iconAlt="Completed projects"
                  value={`${String(user.completedProjects ?? 0).padStart(2, "0")}`}
                  label="Completed Projects"
                  accentClassName="bg-emerald-100 text-emerald-500"
                />
              </div>
            }
          />

          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
            <div className="flex flex-wrap items-end gap-8 border-b border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab("supervise")}
                className={`-mb-px border-b-2 px-2 pb-3 font-primary text-sm transition-colors ${
                  activeTab === "supervise"
                    ? "border-primary text-primary"
                    : "border-transparent text-slate-500"
                }`}
              >
                Project He Supervise
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("ideas")}
                className={`-mb-px border-b-2 px-2 pb-3 font-primary text-sm transition-colors ${
                  activeTab === "ideas"
                    ? "border-primary text-primary"
                    : "border-transparent text-slate-500"
                }`}
              >
                His posted ideas
              </button>
            </div>

            {activeTab === "supervise" ? (
              <div className="mt-5">
                <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <Heading level="h4" className="font-semibold text-content">
                    Teams Projects
                  </Heading>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <label className="relative block w-full sm:w-[180px]">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
                      <input
                        type="search"
                        placeholder="Search"
                        value={superviseSearch}
                        onChange={(event) => setSuperviseSearch(event.target.value)}
                        className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 font-primary text-sm text-content outline-none transition-colors placeholder:text-slate-300 focus:border-primary"
                      />
                    </label>

                    <select
                      value={superviseFilter}
                      onChange={(event) => setSuperviseFilter(event.target.value as SuperviseFilter)}
                      className="h-10 rounded-lg border border-slate-200 bg-white px-3 font-primary text-sm text-content outline-none"
                    >
                      <option value="All">All</option>
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="min-w-[760px] w-full border-collapse bg-white">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/70 text-left font-primary text-xs text-slate-400">
                        <th className="w-12 px-4 py-3"><span className="sr-only">Select</span></th>
                        <th className="px-4 py-3 font-normal">Team Name</th>
                        <th className="px-4 py-3 font-normal">Status</th>
                        <th className="px-4 py-3 font-normal">Members</th>
                        <th className="px-4 py-3 text-center font-normal">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedSupervisedProjects.map((project, index) => (
                        <tr key={`${project.teamName}-${index}`} className="border-b border-slate-100 last:border-b-0">
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              defaultChecked={project.selected}
                              className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                            />
                          </td>
                          <td className="px-4 py-3 font-primary text-sm text-content">{project.teamName}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex rounded-full px-2.5 py-1 font-primary text-[11px] ${projectStatusClasses[project.status]}`}>
                              {project.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="flex -space-x-2">
                                {project.members.map((member, memberIndex) => (
                                  <span key={`${member}-${memberIndex}`} className="flex h-6 w-6 items-center justify-center rounded-full border border-white bg-slate-200 text-[9px] font-semibold text-slate-600">
                                    {member}
                                  </span>
                                ))}
                              </div>
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
                                +2
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-2 text-slate-400">
                              <button type="button" aria-label={`View ${project.teamName}`} className="rounded-full p-1 hover:bg-slate-100 hover:text-slate-600">
                                <Eye className="h-4 w-4" />
                              </button>
                              <IconButton type="button" variant="ghost" size="sm" aria-label={`More actions for ${project.teamName}`} className="rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600">
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
                    <select
                      value={supervisePageSize}
                      onChange={(event) => setSupervisePageSize(Number(event.target.value))}
                      className="h-8 rounded-full border border-slate-200 bg-white px-3 font-primary text-sm text-content outline-none"
                    >
                      {PAGE_SIZE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {renderPagination(
                    supervisePage,
                    superviseTotalPages,
                    () => setSupervisePage((current) => Math.max(1, current - 1)),
                    () => setSupervisePage((current) => Math.min(superviseTotalPages, current + 1)),
                    setSupervisePage,
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-5">
                <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <Heading level="h4" className="font-semibold text-content">
                    Posted Ideas
                  </Heading>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <label className="relative block w-full sm:w-[180px]">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
                      <input
                        type="search"
                        placeholder="Search"
                        value={ideasSearch}
                        onChange={(event) => setIdeasSearch(event.target.value)}
                        className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 font-primary text-sm text-content outline-none transition-colors placeholder:text-slate-300 focus:border-primary"
                      />
                    </label>

                    <select
                      value={ideasFilter}
                      onChange={(event) => setIdeasFilter(event.target.value as IdeasFilter)}
                      className="h-10 rounded-lg border border-slate-200 bg-white px-3 font-primary text-sm text-content outline-none"
                    >
                      <option value="All">All</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="min-w-[720px] w-full border-collapse bg-white">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/70 text-left font-primary text-xs text-slate-400">
                        <th className="w-12 px-4 py-3"><span className="sr-only">Select</span></th>
                        <th className="px-4 py-3 font-normal">Idea Title</th>
                        <th className="px-4 py-3 font-normal">Status</th>
                        <th className="px-4 py-3 font-normal">Date</th>
                        <th className="px-4 py-3 text-center font-normal">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedPostedIdeas.map((idea, index) => (
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
                            <span className={`inline-flex rounded-full px-2.5 py-1 font-primary text-[11px] ${ideaStatusClasses[idea.status]}`}>
                              {idea.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-primary text-sm text-slate-500">{idea.date}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-2 text-slate-400">
                              <button type="button" aria-label={`View ${idea.title}`} className="rounded-full p-1 hover:bg-slate-100 hover:text-slate-600">
                                <Eye className="h-4 w-4" />
                              </button>
                              <IconButton type="button" variant="ghost" size="sm" aria-label={`More actions for ${idea.title}`} className="rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600">
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
                    <select
                      value={ideasPageSize}
                      onChange={(event) => setIdeasPageSize(Number(event.target.value))}
                      className="h-8 rounded-full border border-slate-200 bg-white px-3 font-primary text-sm text-content outline-none"
                    >
                      {PAGE_SIZE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {renderPagination(
                    ideasPage,
                    ideasTotalPages,
                    () => setIdeasPage((current) => Math.max(1, current - 1)),
                    () => setIdeasPage((current) => Math.min(ideasTotalPages, current + 1)),
                    setIdeasPage,
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MentorDetailsView;