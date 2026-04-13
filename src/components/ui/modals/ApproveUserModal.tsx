"use client";

import UserActionConfirmationModal from "./UserActionConfirmationModal";

export interface ApproveUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

const ApproveUserModal = ({ isOpen, onClose, onConfirm, userName }: ApproveUserModalProps) => {
  return (
    <UserActionConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Approve User"
      userName={userName}
      titleId="approve-user-title"
      descriptionId="approve-user-description"
      description={
        <p>
          Are you sure you want to approve this user?
          <br />
          They will gain full access to the platform.
        </p>
      }
      confirmLabel="Approve"
      titleClassName="text-primary"
      confirmButtonClassName="bg-primary hover:bg-primary/90"
    />
  );
};

export default ApproveUserModal;