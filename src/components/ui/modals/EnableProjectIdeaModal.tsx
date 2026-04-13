"use client";

import ProjectIdeaActionConfirmationModal from "./ProjectIdeaActionConfirmationModal";

export interface EnableProjectIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  ideaName: string;
}

const EnableProjectIdeaModal = ({ isOpen, onClose, onConfirm, ideaName }: EnableProjectIdeaModalProps) => {
  return (
    <ProjectIdeaActionConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => onConfirm()}
      title="Enable Idea"
      ideaName={ideaName}
      titleId="enable-idea-title"
      descriptionId="enable-idea-description"
      description="This idea will be restored and visible to students again."
      confirmLabel="Enable Idea"
      titleClassName="text-primary"
      confirmButtonClassName="bg-primary hover:bg-primary/90"
    />
  );
};

export default EnableProjectIdeaModal;