"use client";

import UserActionConfirmationModal from "./UserActionConfirmationModal";

export interface DisableUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

const DisableUserModal = ({ isOpen, onClose, onConfirm, userName }: DisableUserModalProps) => {
  return (
    <UserActionConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Disable User Account"
      userName={userName}
      titleId="disable-user-title"
      descriptionId="disable-user-description"
      description={
        <p>
          Are you sure you want to disable this user account?
          <br />
          The user will no longer be able to access the platform.
        </p>
      }
      confirmLabel="Disable User"
      titleClassName="text-error"
      confirmButtonClassName="bg-error hover:bg-error/90"
    />
  );
};

export default DisableUserModal;