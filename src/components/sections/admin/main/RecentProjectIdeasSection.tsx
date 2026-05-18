"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search, Filter, Eye, MoreVertical } from "lucide-react";
import { Heading } from "@/components/ui/typography";
import { ADMIN_RECENT_IDEAS } from "@/mock/AdminDashboard";

export const RecentProjectIdeasSection = () => {
  const [ideaQuery, setIdeaQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Pending" | "Approved" | "Rejected"
  >("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredIdeas = useMemo(() => {
    return ADMIN_RECENT_IDEAS.filter((idea) => {
      const matchesQuery =
        idea.title.toLowerCase().includes(ideaQuery.toLowerCase()) ||
        idea.submittedBy.toLowerCase().includes(ideaQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || idea.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [ideaQuery, statusFilter]);

  const totalPages = Math.ceil(filteredIdeas.length / itemsPerPage);
  const paginatedIdeas = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredIdeas.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredIdeas, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)] sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Heading
          level="h5"
          className="text-lg font-semibold text-content sm:text-xl"
        >
          Recent Project Ideas
        </Heading>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 sm:w-auto">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="text"
              value={ideaQuery}
              onChange={(e) => setIdeaQuery(e.target.value)}
              placeholder="Search"
              aria-label="Search project ideas"
              className="h-11 w-full border-0 bg-transparent pl-9 pr-3 font-primary text-sm text-content placeholder:text-slate-400 focus:outline-none focus:ring-0 sm:w-64"
            />
          </div>

          <div className="relative w-24 overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 sm:w-auto">
            <Filter
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as typeof statusFilter)
              }
              aria-label="Filter project ideas"
              className="h-11 w-full border-0 bg-transparent pl-9 pr-10 font-primary text-sm text-content focus:outline-none focus:ring-0 sm:w-24"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 text-left font-primary text-[10px] uppercase tracking-wide text-slate-400 lg:text-[11px]">
              <th className="w-8 px-2 py-3 sm:w-10 sm:px-3"> </th>
              <th className="px-2 py-3 sm:px-3">Idea Title</th>
              <th className="px-2 py-3 sm:px-3">Submitted By</th>
              <th className="px-2 py-3 sm:px-3">Status</th>
              <th className="px-2 py-3 sm:px-3">Date</th>
              <th className="px-2 py-3 text-right sm:px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedIdeas.map((idea, index) => (
              <tr
                key={idea.id}
                className={`border-b border-slate-200 text-sm text-content transition-colors hover:bg-slate-50 ${
                  index === paginatedIdeas.length - 1 ? "border-b-0" : ""
                }`}
              >
                <td className="px-2 py-3 sm:px-3">
                  <input
                    type="checkbox"
                    checked={idea.selected}
                    readOnly
                    className="h-4 w-4 cursor-pointer rounded border border-slate-300 text-primary accent-primary focus:ring-primary"
                  />
                </td>
                <td className="px-2 py-3 font-primary text-xs text-slate-700 sm:px-3 sm:text-sm">
                  {idea.title}
                </td>
                <td className="px-2 py-3 sm:px-3">
                  <div className="flex items-center gap-2">
                    <div className="relative h-6 w-6 overflow-hidden rounded-full ring-2 ring-white sm:h-7 sm:w-7">
                      <Image
                        src="/images/user.png"
                        alt={idea.submittedBy}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="28px"
                      />
                    </div>
                    <div className="truncate">
                      <div className="truncate font-primary text-xs text-slate-700 sm:text-sm">
                        {idea.submittedBy}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-3 sm:px-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 font-primary text-[10px] font-semibold sm:px-2.5 sm:py-1 sm:text-[11px] ${
                      idea.status === "Approved"
                        ? "bg-success/10 text-success"
                        : idea.status === "Rejected"
                          ? "bg-error/10 text-error"
                          : "bg-warning/10 text-warning"
                    }`}
                  >
                    {idea.status}
                  </span>
                </td>
                <td className="px-2 py-3 font-primary text-xs text-slate-500 sm:px-3">
                  {idea.date}
                </td>
                <td className="px-2 py-3 sm:px-3">
                  <div className="flex items-center justify-end gap-1 text-slate-500">
                    <button
                      type="button"
                      aria-label={`View ${idea.title}`}
                      className="rounded-lg p-1.5 hover:bg-slate-100 sm:p-2"
                    >
                      <Eye size={16} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label={`More actions for ${idea.title}`}
                      className="rounded-lg p-1.5 hover:bg-slate-100 sm:p-2"
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

      <div className="mt-4 flex items-center justify-between gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>Show result:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="h-8 rounded-lg border border-slate-200 bg-white pl-2 pr-8 text-xs text-slate-600 focus:outline-none focus:ring-0"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-lg px-3 py-2 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => handlePageChange(page)}
              className={`rounded-full px-3 py-2 ${
                currentPage === page
                  ? "bg-primary-light text-primary"
                  : "hover:bg-slate-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-lg px-3 py-2 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ›
          </button>
        </div>
      </div>
    </article>
  );
};
