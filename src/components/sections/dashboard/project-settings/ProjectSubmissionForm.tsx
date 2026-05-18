"use client";

import Link from "next/link";
import { useState } from "react";
import { FileText, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/buttons";
import { variantClasses, sizeClasses } from "@/components/ui/buttons/buttonStyles";
import { Checkbox } from "@/components/ui/forms";
import {
  FileLinkModal,
  ProjectSubmissionConfirmModal,
  ProjectSubmissionSuccessModal,
} from "@/components/ui/modals";
import { MOCK_PROJECT, TEAM_WORKSPACE_HREF } from "@/mock/Dashboard";

const ACK_LABEL_SHORT =
  "I and my team members acknowledge that this work is original and has not been previously presented...";

const mentorDisplayName = (supervisor: string) =>
  supervisor.replace(/^Dr\.?\s*/i, "").trim() || "Name";

interface SubmissionLink {
  name: string;
  url: string;
}

const ProjectSubmissionForm = () => {
  const [files, setFiles] = useState<SubmissionLink[]>([]);
  const [acknowledged, setAcknowledged] = useState(true);
  const [locked, setLocked] = useState(false);
  const [replacingFile, setReplacingFile] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [linkOpen, setLinkOpen] = useState(false);

  const hasFile = files.length > 0;
  const showFileActions = hasFile && !locked;
  const showPreview = locked || (hasFile && !replacingFile);
  const fileName = files[0]?.name ?? "";
  const fileUrl = files[0]?.url ?? "";

  const canOpenConfirmModal = hasFile && acknowledged && !locked;

  const handleFileLinkSubmit = (next: SubmissionLink) => {
    setFiles([next]);
    setReplacingFile(false);
  };

  const handleDelete = () => {
    setFiles([]);
    setReplacingFile(false);
  };

  const handleSubmitFinalProject = () => {
    if (!canOpenConfirmModal) return;
    setConfirmOpen(true);
  };

  const handleFinalConfirm = () => {
    setLocked(true);
    setConfirmOpen(false);
    setSuccessOpen(true);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 md:p-8">
      <div>
        <h3 className="font-primary text-lg font-semibold text-content">Final Project Submission</h3>
        <p className="mt-2 font-primary text-sm leading-relaxed text-content-light">
          {locked ? (
            <>
              Your submission has been received. The project is locked and will be sent to the
              supervisor and committee for final evaluation.
            </>
          ) : (
            <>
              Please ensure that the final project link is added. Once submission is complete, the
              project will be locked and sent to the supervisor and committee for final evaluation.
            </>
          )}
        </p>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-primary text-sm font-semibold text-content">Final Report</p>
            {!hasFile && !locked && !replacingFile ? (
              <p className="mt-1 font-primary text-sm text-content-light">
                Please add a link to the final project file or folder.
              </p>
            ) : null}
            {showPreview && fileName ? (
              <div className="mt-1 space-y-1">
                <p className="truncate font-primary text-sm text-content-light" title={fileName}>
                  {fileName}
                </p>
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-primary text-xs text-primary hover:underline"
                >
                  <LinkIcon size={13} aria-hidden="true" />
                  Open link
                </a>
              </div>
            ) : null}
          </div>

          {showFileActions && replacingFile ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="shrink-0 self-start text-content-light hover:text-content"
              onClick={() => setReplacingFile(false)}
            >
              Cancel edit
            </Button>
          ) : null}

          {showFileActions && !replacingFile ? (
            <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => {
                  setReplacingFile(true);
                  setLinkOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="!border-error !text-error hover:!bg-error/10 hover:!text-error"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          ) : null}
        </div>

        <div className="mt-4">
          {!locked && !hasFile ? (
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="w-full justify-center sm:w-auto"
              onClick={() => setLinkOpen(true)}
            >
              Add File Link
            </Button>
          ) : showPreview ? (
            <div
              className="flex aspect-[4/3] max-h-52 w-full max-w-xs flex-col items-center justify-center gap-3 rounded-2xl bg-primary-light/80 p-6 sm:aspect-square sm:max-h-none"
              aria-hidden="true"
            >
              <div className="relative">
                <FileText className="h-16 w-16 text-primary sm:h-20 sm:w-20" strokeWidth={1.25} />
                <LinkIcon
                  className="absolute -bottom-1 -right-1 h-8 w-8 text-primary sm:h-9 sm:w-9"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
        <Checkbox
          id="submission-acknowledgment"
          label={ACK_LABEL_SHORT}
          checked={acknowledged}
          disabled={locked}
          onChange={(e) => setAcknowledged(e.target.checked)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        {!locked ? (
          <Button
            type="button"
            variant="primary"
            size="md"
            disabled={!canOpenConfirmModal}
            onClick={handleSubmitFinalProject}
          >
            Submit Final Project
          </Button>
        ) : (
          <p className="font-primary text-sm font-medium text-primary">Submitted</p>
        )}
        <Link
          href={TEAM_WORKSPACE_HREF}
          className={`inline-flex items-center justify-center rounded-lg font-primary font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${variantClasses.secondary} ${sizeClasses.md}`}
        >
          Cancel
        </Link>
      </div>

      <ProjectSubmissionConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleFinalConfirm}
      />

      <ProjectSubmissionSuccessModal
        isOpen={successOpen}
        onClose={() => setSuccessOpen(false)}
        mentorName={mentorDisplayName(MOCK_PROJECT.supervisor)}
      />

      <FileLinkModal
        isOpen={linkOpen}
        onClose={() => {
          setLinkOpen(false);
          setReplacingFile(false);
        }}
        onSubmit={handleFileLinkSubmit}
        title="Add Final Project Link"
        submitLabel="Save Link"
        nameLabel="Report name"
        urlLabel="Project file link"
        initialName={fileName}
        initialUrl={fileUrl}
      />
    </div>
  );
};

export default ProjectSubmissionForm;
