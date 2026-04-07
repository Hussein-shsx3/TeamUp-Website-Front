"use client";

import DeleteConfirmationModal from "./DeleteConfirmationModal";

export interface DeleteProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteProjectModal = ({
  isOpen,
  onClose,
  onConfirm,
}: DeleteProjectModalProps) => {
  return (
    <DeleteConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Project"
      titleId="delete-project-title"
      descriptionId="delete-project-description"
      description={
        <p>
          Are you sure you want to permanently delete this project? This action
          cannot be undone.
        </p>
      }
    />
  );
};

export default DeleteProjectModal;
