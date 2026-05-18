"use client";

import { useState } from "react";
import Image from "next/image";
import { FileText } from "lucide-react";
import { SubmitProjectReviewModal } from "@/components/ui/modals";
import { Button } from "@/components/ui/buttons";

interface WorkspaceProjectOverviewProps {
  projectName: string;
  supervisor: string;
  description: string;
  isLead: boolean;
}

const WorkspaceProjectOverview = ({
  projectName,
  supervisor,
  description,
  isLead,
}: WorkspaceProjectOverviewProps) => {
  const [submitReviewOpen, setSubmitReviewOpen] = useState(false);

  return (
    <>
    <div
      className="mb-6 flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]
       lg:flex-row lg:items-stretch lg:gap-6 overflow-hidden"
    >
      <div
        className="flex h-40 shrink-0 items-center justify-center bg-primary-light sm:h-44 lg:h-auto lg:w-52
          xl:w-56"
      >
        <FileText className="h-14 w-14 text-primary" strokeWidth={1.5} aria-hidden="true" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-4 p-3 md:p-5 pl-3 md:pl-0">
        <div>
          <h2 className="font-primary text-lg font-semibold leading-tight text-content sm:text-xl">
            {projectName}
          </h2>
          <div className="mt-2 flex items-center gap-2">
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-gray-100">
              <Image
                src="/images/user.png"
                alt=""
                fill
                unoptimized
                className="object-cover"
                sizes="32px"
              />
            </div>
            <p className="font-primary text-xs text-content-light sm:text-sm">
              Supervisor by {supervisor}
            </p>
          </div>
        </div>
        <p className="font-primary text-sm leading-relaxed text-content-light">{description}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {isLead ? (
            <>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => setSubmitReviewOpen(true)}
              >
                Submit for Review
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => console.log("update project (mock)")}
              >
                Update
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="primary"
                size="md"
                disabled
                className="bg-gray-100 text-content-muted hover:bg-gray-100"
              >
                Submit for Review
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => console.log("see full spec (mock)")}
              >
                See full spec
              </Button>
            </>
          )}
        </div>
      </div>
    </div>

    <SubmitProjectReviewModal
      isOpen={submitReviewOpen}
      onClose={() => setSubmitReviewOpen(false)}
      onSubmit={(note) => console.log("submit for review (mock)", note)}
    />
    </>
  );
};

export default WorkspaceProjectOverview;
