"use client";

import DeleteConfirmationModal from "./DeleteConfirmationModal";

export interface DeleteProjectIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  projectName?: string;
}

export const DeleteProjectIdeaModal = ({
  isOpen,
  onClose,
  onConfirm,
  projectName = "[Project Name]",
}: DeleteProjectIdeaModalProps) => {
  return (
    <DeleteConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Project idea"
      titleId="delete-project-idea-title"
      descriptionId="delete-project-idea-description"
      description={
        <p>
          Are you sure you want to Delete the{" "}
          <span className="text-primary">{projectName}</span> project permanently?
        </p>
      }
    />
  );
};
