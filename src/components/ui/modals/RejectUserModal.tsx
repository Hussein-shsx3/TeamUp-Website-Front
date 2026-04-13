"use client";

import UserActionConfirmationModal from "./UserActionConfirmationModal";

export interface RejectUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

const RejectUserModal = ({ isOpen, onClose, onConfirm, userName }: RejectUserModalProps) => {
  return (
    <UserActionConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Reject User"
      userName={userName}
      titleId="reject-user-title"
      descriptionId="reject-user-description"
      description={
        <p>
          Please provide a reason for rejecting this user registration.
        </p>
      }
      confirmLabel="Reject User"
      titleClassName="text-error"
      confirmButtonClassName="bg-error hover:bg-error/90"
    />
  );
};

export default RejectUserModal;