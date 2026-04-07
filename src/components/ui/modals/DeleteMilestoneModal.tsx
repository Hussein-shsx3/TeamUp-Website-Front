"use client";

import DeleteConfirmationModal from "./DeleteConfirmationModal";

export interface DeleteMilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  milestoneTitle: string;
}

const DeleteMilestoneModal = ({
  isOpen,
  onClose,
  onConfirm,
  milestoneTitle,
}: DeleteMilestoneModalProps) => {
  return (
    <DeleteConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete milestone"
      titleId="delete-milestone-title"
      descriptionId="delete-milestone-description"
      description={
        <p>
          Are you sure you want to delete{" "}
          <span className="font-semibold text-primary">&quot;{milestoneTitle}&quot;</span>{" "}
          permanently?
        </p>
      }
    />
  );
};

export default DeleteMilestoneModal;
