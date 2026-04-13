"use client";

import ProjectIdeaActionConfirmationModal from "./ProjectIdeaActionConfirmationModal";

export interface ApproveProjectIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  ideaName: string;
}

const ApproveProjectIdeaModal = ({ isOpen, onClose, onConfirm, ideaName }: ApproveProjectIdeaModalProps) => {
  return (
    <ProjectIdeaActionConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => onConfirm()}
      title="Approve Idea"
      ideaName={ideaName}
      titleId="approve-idea-title"
      descriptionId="approve-idea-description"
      description="This idea will be published and available for students."
      confirmLabel="Approve idea"
      titleClassName="text-primary"
      confirmButtonClassName="bg-primary hover:bg-primary/90"
    />
  );
};

export default ApproveProjectIdeaModal;