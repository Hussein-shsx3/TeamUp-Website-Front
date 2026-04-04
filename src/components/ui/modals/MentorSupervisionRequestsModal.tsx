"use client";

import { Mail } from "lucide-react";

import { Button } from "@/components/ui/buttons";
import { Modal } from "@/components/ui/modals";
import type { MockSupervisionRequest } from "@/mock/Dashboard";

interface MentorSupervisionRequestsModalProps {
  open: boolean;
  requests: MockSupervisionRequest[];
  onClose: () => void;
  onReviewRequest: (request: MockSupervisionRequest) => void;
  onAcceptRequest?: (request: MockSupervisionRequest) => void;
  onRejectRequest?: (request: MockSupervisionRequest) => void;
}

export function MentorSupervisionRequestsModal({
  open,
  requests,
  onClose,
  onReviewRequest,
  onAcceptRequest,
  onRejectRequest,
}: MentorSupervisionRequestsModalProps) {
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="w-full max-w-[560px] overflow-hidden rounded-[20px] border border-slate-200 bg-white p-0 shadow-[0_30px_90px_rgba(15,23,42,0.18)]"
    >
      <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
        <div className="flex items-start gap-3 pr-8">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e7eefb] text-[#3f6ad8]">
            <Mail className="h-4 w-4" />
          </div>
          <h2 className="pt-1 text-[18px] font-semibold leading-tight text-slate-900">
            Supervision proposals for students! 📬
          </h2>
        </div>
      </div>

      <div className="max-h-[68vh] overflow-y-auto px-5 py-2 sm:px-6 sm:py-3">
        {requests.map((request, index) => (
          <div
            key={request.id}
            className={`py-4 ${index > 0 ? "border-t border-slate-200" : ""}`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] leading-5 text-slate-900">
                  A team <span className="font-semibold">&quot;{request.teamName}&quot;</span> has sent you a request to mentor their graduation project.
                </p>
                <button
                  type="button"
                  onClick={() => onReviewRequest(request)}
                  className="mt-1 inline-flex text-[13px] font-medium text-[#3559c7] transition hover:text-[#2748af]"
                >
                  Review their proposal and decide now.
                </button>
              </div>

              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => onRejectRequest?.(request)}
                  className="inline-flex h-8 items-center justify-center rounded-lg border border-[#ef4444] px-4 text-[13px] font-medium text-[#ef4444] transition hover:bg-[#fff5f5]"
                >
                  Reject
                </button>
                <Button
                  variant="primary"
                  className="h-8 rounded-lg px-4 text-[13px]"
                  onClick={() => onAcceptRequest?.(request)}
                >
                  Accept
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
