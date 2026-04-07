"use client";

import DeleteConfirmationModal from "./DeleteConfirmationModal";

export interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Called when the user confirms deletion in the modal. */
  onConfirm: () => void;
}

const DeleteAccountModal = ({
  isOpen,
  onClose,
  onConfirm,
}: DeleteAccountModalProps) => {
  return (
    <DeleteConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Account"
      titleId="delete-account-title"
      descriptionId="delete-account-description"
      description={
        <p>
          Are you sure that you want to permanently delete your account?
        </p>
      }
    />
  );
};

export default DeleteAccountModal;
