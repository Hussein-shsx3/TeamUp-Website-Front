"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "@/components/ui/navigation";
import {
  ApproveProjectIdeaModal,
  DisableProjectIdeaModal,
  EnableProjectIdeaModal,
  RejectProjectIdeaModal,
} from "@/components/ui/modals";
import { Heading } from "@/components/ui/typography";
import {
  ADMIN_PROJECT_IDEAS,
  type AdminProjectIdeaRecord,
  type AdminProjectIdeaStatus,
} from "@/mock/ProjectsIdeas";
import ProjectIdeasToolbar from "./ProjectIdeasToolbar";
import ProjectIdeasTable from "./ProjectIdeasTable";
import ProjectIdeasBulkActionsBar from "./ProjectIdeasBulkActionsBar";

const INITIAL_PAGE_SIZE = 12;

const ProjectIdeasManagementView = () => {
  const [ideas, setIdeas] = useState<AdminProjectIdeaRecord[]>(ADMIN_PROJECT_IDEAS);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdminProjectIdeaStatus | "All">("All");
  const [typeFilter, setTypeFilter] = useState<"All" | "free" | "paid">("All");
  const [itemsPerPage, setItemsPerPage] = useState(INITIAL_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(
    () => new Set(ADMIN_PROJECT_IDEAS.filter((idea) => idea.selected).map((idea) => idea.id)),
  );
  const [notice, setNotice] = useState<string | null>(null);
  const [activeActionModal, setActiveActionModal] = useState<{
    action: "approve" | "reject" | "disable" | "enable";
    idea: AdminProjectIdeaRecord;
  } | null>(null);

  const filteredIdeas = useMemo(() => {
    const search = query.trim().toLowerCase();

    return ideas.filter((idea) => {
      const matchesQuery =
        search.length === 0 ||
        idea.name.toLowerCase().includes(search) ||
        idea.submittedBy.toLowerCase().includes(search);
      const matchesStatus = statusFilter === "All" || idea.status === statusFilter;
      const matchesType = typeFilter === "All" || idea.price === typeFilter;
      return matchesQuery && matchesStatus && matchesType;
    });
  }, [typeFilter, ideas, query, statusFilter]);

  const sortedIdeas = useMemo(() => {
    return [...filteredIdeas].sort((leftIdea, rightIdea) => {
      const leftTime = new Date(leftIdea.postedAt).getTime();
      const rightTime = new Date(rightIdea.postedAt).getTime();
      return sortDirection === "desc" ? rightTime - leftTime : leftTime - rightTime;
    });
  }, [filteredIdeas, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedIdeas.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedIdeas = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    return sortedIdeas.slice(startIndex, startIndex + itemsPerPage);
  }, [itemsPerPage, safeCurrentPage, sortedIdeas]);

  const selectedCount = selectedIds.size;

  useEffect(() => {
    setCurrentPage(1);
  }, [query, statusFilter, typeFilter, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setNotice(null);
  }, [query, statusFilter, typeFilter, sortDirection, itemsPerPage]);

  const toggleIdeaSelection = (ideaId: number) => {
    setSelectedIds((previous) => {
      const next = new Set(previous);
      if (next.has(ideaId)) {
        next.delete(ideaId);
      } else {
        next.add(ideaId);
      }
      return next;
    });
  };

  const toggleVisibleIdeasSelection = (ideaIds: number[]) => {
    setSelectedIds((previous) => {
      const next = new Set(previous);
      const allVisibleSelected = ideaIds.every((ideaId) => next.has(ideaId));

      if (allVisibleSelected) {
        ideaIds.forEach((ideaId) => next.delete(ideaId));
        return next;
      }

      ideaIds.forEach((ideaId) => next.add(ideaId));
      return next;
    });
  };

  const updateIdeaStatus = (ideaIds: number[], status: AdminProjectIdeaStatus) => {
    setIdeas((previous) =>
      previous.map((idea) => (ideaIds.includes(idea.id) ? { ...idea, status } : idea)),
    );
  };

  const requestIdeaAction = (action: "approve" | "reject", idea: AdminProjectIdeaRecord) => {
    setActiveActionModal({ action, idea });
  };

  const requestDisableAction = (idea: AdminProjectIdeaRecord) => {
    setActiveActionModal({ action: "disable", idea });
  };

  const requestEnableAction = (idea: AdminProjectIdeaRecord) => {
    setActiveActionModal({ action: "enable", idea });
  };

  const closeActionModal = () => setActiveActionModal(null);

  const confirmActiveAction = (reason?: string) => {
    if (!activeActionModal) return;

    if (activeActionModal.action === "approve") {
      updateIdeaStatus([activeActionModal.idea.id], "Approved");
      setNotice(`${activeActionModal.idea.name} approved`);
      setActiveActionModal(null);
      return;
    }

    if (activeActionModal.action === "disable") {
      updateIdeaStatus([activeActionModal.idea.id], "Rejected");
      setNotice(`${activeActionModal.idea.name} disabled`);
      setActiveActionModal(null);
      return;
    }

    if (activeActionModal.action === "enable") {
      updateIdeaStatus([activeActionModal.idea.id], "Approved");
      setNotice(`${activeActionModal.idea.name} enabled`);
      setActiveActionModal(null);
      return;
    }

    updateIdeaStatus([activeActionModal.idea.id], "Rejected");
    setNotice(
      reason?.trim()
        ? `${activeActionModal.idea.name} rejected: ${reason.trim()}`
        : `${activeActionModal.idea.name} rejected`,
    );
    setActiveActionModal(null);
  };

  const handleBulkApprove = () => {
    const ids = [...selectedIds];
    if (ids.length === 0) return;
    updateIdeaStatus(ids, "Approved");
    setNotice(`${ids.length} idea${ids.length > 1 ? "s" : ""} approved`);
  };

  const handleBulkReject = () => {
    const ids = [...selectedIds];
    if (ids.length === 0) return;
    updateIdeaStatus(ids, "Rejected");
    setNotice(`${ids.length} idea${ids.length > 1 ? "s" : ""} rejected`);
  };

  return (
    <div className="flex flex-col">
      <Breadcrumb items={[{ label: "Dashboard", href: "/admin" }, { label: "Project Ideas" }]} />

      <section className="mb-5 space-y-1">
        <Heading level="h4" className="text-[28px] font-semibold text-content sm:text-[30px]">
          Project Ideas
        </Heading>
        <p className="max-w-2xl font-primary text-sm text-slate-500 sm:text-base">
          Review, filter, and moderate submitted project ideas.
        </p>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
        <ProjectIdeasToolbar
          query={query}
          statusFilter={statusFilter}
          typeFilter={typeFilter}
          onQueryChange={setQuery}
          onStatusFilterChange={setStatusFilter}
          onTypeFilterChange={setTypeFilter}
        />

        {notice ? (
          <div className="border-b border-slate-100 px-4 py-3 sm:px-5">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 px-3 py-2 font-primary text-sm text-primary">
              <CheckCircle2 size={16} aria-hidden="true" />
              {notice}
            </div>
          </div>
        ) : null}

        <ProjectIdeasTable
          ideas={paginatedIdeas}
          selectedIds={selectedIds}
          onToggleIdea={toggleIdeaSelection}
          onToggleSelectAll={toggleVisibleIdeasSelection}
          onToggleSort={() => setSortDirection((previous) => (previous === "desc" ? "asc" : "desc"))}
          sortDirection={sortDirection}
          onApprove={(idea) => requestIdeaAction("approve", idea)}
          onReject={(idea) => requestIdeaAction("reject", idea)}
          onDisable={requestDisableAction}
          onEnable={requestEnableAction}
        />

        <div className="flex flex-col gap-4 border-t border-slate-100 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-3 sm:justify-start">
            <span className="font-primary text-xs text-slate-500 sm:text-sm">Show result:</span>
            <select
              value={itemsPerPage}
              onChange={(event) => setItemsPerPage(Number(event.target.value))}
              className="h-8 w-20 rounded-lg border border-slate-200 bg-white pl-2 pr-8 font-primary text-xs text-slate-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 sm:w-16"
            >
              {[12, 24, 36].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-center gap-1 overflow-x-auto pb-1 lg:justify-end lg:pb-0">
            <button
              type="button"
              onClick={() => setCurrentPage((previous) => Math.max(1, previous - 1))}
              disabled={currentPage === 1}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-transparent text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`inline-flex h-9 min-w-9 shrink-0 items-center justify-center rounded-full px-3 font-primary text-sm transition-colors ${
                  safeCurrentPage === page
                    ? "bg-primary/10 text-primary"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
                aria-current={safeCurrentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((previous) => Math.min(totalPages, previous + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-transparent text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex justify-center px-4 pb-5 sm:px-5">
          <ProjectIdeasBulkActionsBar
            selectedCount={selectedCount}
            onApprove={handleBulkApprove}
            onReject={handleBulkReject}
          />
        </div>

        {activeActionModal ? (
          <>
            <ApproveProjectIdeaModal
              isOpen={activeActionModal.action === "approve"}
              onClose={closeActionModal}
              onConfirm={() => confirmActiveAction()}
              ideaName={activeActionModal.idea.name}
            />
            <RejectProjectIdeaModal
              isOpen={activeActionModal.action === "reject"}
              onClose={closeActionModal}
              onConfirm={(reason) => confirmActiveAction(reason)}
              ideaName={activeActionModal.idea.name}
            />
            <DisableProjectIdeaModal
              isOpen={activeActionModal.action === "disable"}
              onClose={closeActionModal}
              onConfirm={() => confirmActiveAction()}
              ideaName={activeActionModal.idea.name}
            />
            <EnableProjectIdeaModal
              isOpen={activeActionModal.action === "enable"}
              onClose={closeActionModal}
              onConfirm={() => confirmActiveAction()}
              ideaName={activeActionModal.idea.name}
            />
          </>
        ) : null}
      </section>
    </div>
  );
};

export default ProjectIdeasManagementView;