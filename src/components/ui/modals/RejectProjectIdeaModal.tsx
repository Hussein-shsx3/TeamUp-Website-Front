"use client";

import ProjectIdeaActionConfirmationModal from "./ProjectIdeaActionConfirmationModal";

export interface RejectProjectIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  ideaName: string;
}

const RejectProjectIdeaModal = ({ isOpen, onClose, onConfirm, ideaName }: RejectProjectIdeaModalProps) => {
  return (
    <ProjectIdeaActionConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Reject Idea"
      ideaName={ideaName}
      titleId="reject-idea-title"
      descriptionId="reject-idea-description"
      description="Please provide a reason for rejecting this idea."
      confirmLabel="Reject Idea"
      titleClassName="text-error"
      confirmButtonClassName="bg-error hover:bg-error/90"
      showReasonField
    />
  );
};

export default RejectProjectIdeaModal;