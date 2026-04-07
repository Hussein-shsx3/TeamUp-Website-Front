"use client";

import DeleteConfirmationModal from "./DeleteConfirmationModal";

export interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle: string;
}

const DeleteTaskModal = ({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
}: DeleteTaskModalProps) => {
  return (
    <DeleteConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete task"
      titleId="delete-task-title"
      descriptionId="delete-task-description"
      confirmLabel="Delete task"
      description={
        <p>
          Are you sure you want to delete{" "}
          <span className="font-semibold text-primary">&quot;{taskTitle}&quot;</span> permanently?
        </p>
      }
    />
  );
};

export default DeleteTaskModal;
