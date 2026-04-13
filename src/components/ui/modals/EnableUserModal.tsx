"use client";

import UserActionConfirmationModal from "./UserActionConfirmationModal";

export interface EnableUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

const EnableUserModal = ({ isOpen, onClose, onConfirm, userName }: EnableUserModalProps) => {
  return (
    <UserActionConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Enable User"
      userName={userName}
      titleId="enable-user-title"
      descriptionId="enable-user-description"
      description={<p>This will restore access to the platform for this user.</p>}
      confirmLabel="Enable User"
      titleClassName="text-primary"
      confirmButtonClassName="bg-primary hover:bg-primary/90"
    />
  );
};

export default EnableUserModal;