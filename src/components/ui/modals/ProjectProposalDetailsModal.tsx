"use client";

import Image from "next/image";
import { ChevronLeft, Users } from "lucide-react";

import { Button } from "@/components/ui/buttons";
import { Modal } from "@/components/ui/modals";
import type { MockSupervisionRequest } from "@/mock/Dashboard";

interface ProjectProposalDetailsModalProps {
  open: boolean;
  request: MockSupervisionRequest | null;
  onClose: () => void;
  onBack: () => void;
  onAccept: (request: MockSupervisionRequest) => void;
  onReject: (request: MockSupervisionRequest) => void;
}

export function ProjectProposalDetailsModal({
  open,
  request,
  onClose,
  onBack,
  onAccept,
  onReject,
}: ProjectProposalDetailsModalProps) {
  if (!request) {
    return null;
  }

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="w-full max-w-[650px] overflow-hidden rounded-[20px] border border-slate-200 bg-white p-0 shadow-[0_30px_90px_rgba(15,23,42,0.18)]"
    >
      <div className="px-5 py-4 sm:px-6">
        <div>
          <h2 className="mt-2 text-[22px] font-semibold leading-tight text-slate-900">
            Project Proposal Details
          </h2>
        </div>
      </div>

      <div className="max-h-[72vh] overflow-y-auto px-5 py-5 sm:px-6">
        <div className="space-y-4">
          <section className="rounded-[16px] border-b pb-4 border-slate-200 bg-white">
            <div className="flex items-start justify-between gap-4">
              <p className="text-[15px] font-semibold text-slate-900">
                Project Title
              </p>
              <p className="text-right text-[15px] text-slate-500">
                {request.projectTitle}
              </p>
            </div>
          </section>

          <section className="rounded-[16px]">
            <p className="text-[15px] font-semibold text-slate-900">
              Team Members
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              {request.teamMembers.map((member, index) => (
                <div
                  key={`${member}-${index}`}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-white shadow-sm">
                    <Image
                      src="/images/user.png"
                      alt={member}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <span className="max-w-20 text-[11px] font-medium leading-4 text-slate-500">
                    {member}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[16px]">
            <p className="text-[15px] font-semibold text-slate-900">
              Description
            </p>
            <p className="mt-3 text-[14px] leading-7 text-slate-500">
              {request.description}
            </p>
          </section>

          <section className="rounded-[16px]">
            <p className="text-[15px] font-semibold text-slate-900">
              Tech Stack
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {request.techStack.map((skill) => (
                <span
                  key={skill}
                  className="rounded-[4px] bg-[#dce8ff] px-3 py-1.5 text-[11px] font-medium text-[#3559c7]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-slate-200 px-5 py-4 sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium text-[#3559c7] transition hover:bg-[#eef4ff]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        <div className="flex items-center gap-2.5">
          {" "}
          <Button
            variant="primary"
            className="h-10 rounded-lg px-7 text-sm"
            onClick={() => onAccept(request)}
          >
            Accept
          </Button>
          <button
            type="button"
            onClick={() => onReject(request)}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-[#ef4444] px-5 text-sm font-medium text-[#ef4444] transition hover:bg-[#fff5f5]"
          >
            Reject
          </button>
        </div>
      </div>
    </Modal>
  );
}
