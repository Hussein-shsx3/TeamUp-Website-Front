"use client";

import ProjectIdeaActionConfirmationModal from "./ProjectIdeaActionConfirmationModal";

export interface DisableProjectIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  ideaName: string;
}

const DisableProjectIdeaModal = ({ isOpen, onClose, onConfirm, ideaName }: DisableProjectIdeaModalProps) => {
  return (
    <ProjectIdeaActionConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => onConfirm()}
      title="Disable Idea"
      ideaName={ideaName}
      titleId="disable-idea-title"
      descriptionId="disable-idea-description"
      description="This idea will be disabled and hidden from students."
      confirmLabel="Disable Idea"
      titleClassName="text-error"
      confirmButtonClassName="bg-error hover:bg-error/90"
    />
  );
};

export default DisableProjectIdeaModal;