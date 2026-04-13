"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import { Button } from "@/components/ui/buttons";
import { Heading } from "@/components/ui/typography";

interface ProjectIdeaActionConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  title: string;
  ideaName: string;
  description: string;
  confirmLabel: string;
  titleId: string;
  descriptionId: string;
  titleClassName: string;
  confirmButtonClassName: string;
  showReasonField?: boolean;
}

const ProjectIdeaActionConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  ideaName,
  description,
  confirmLabel,
  titleId,
  descriptionId,
  titleClassName,
  confirmButtonClassName,
  showReasonField = false,
}: ProjectIdeaActionConfirmationModalProps) => {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setReason("");
    }
  }, [isOpen]);

  const handleConfirm = () => {
    onConfirm(reason.trim() || undefined);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeButtonClassName="text-content hover:bg-gray-100 hover:text-content"
      className="max-w-[480px] w-full p-4 sm:p-6"
    >
      <div className="flex flex-col">
        <Heading level="h5" id={titleId} className={`pr-10 font-bold leading-tight ${titleClassName}`}>
          {title} <span className="text-content-light text-base">@{ideaName}</span>
        </Heading>

        <div
          id={descriptionId}
          className={`mt-4 font-primary text-sm leading-relaxed text-content-light ${showReasonField ? "text-left" : "text-center"}`}
        >
          <p>{description}</p>
        </div>

        {showReasonField ? (
          <textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            rows={5}
            placeholder="Write reason here"
            className="mt-3 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 font-primary text-sm text-content outline-none transition-colors placeholder:text-slate-300 focus:border-primary"
          />
        ) : null}

        <div className="mt-5 flex gap-2.5">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onClose}
            className="w-full !border-gray-200 !text-content"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={handleConfirm}
            className={`w-full ${confirmButtonClassName}`}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectIdeaActionConfirmationModal;