"use client";

import Modal from "./Modal";
import { Button } from "@/components/ui/buttons";

export interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal = ({ isOpen, onClose, onConfirm }: LogoutModalProps) => {
  const handleLogout = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeButtonClassName="text-content hover:bg-gray-100"
      className="max-w-md w-full p-6 pt-12 sm:p-8 sm:pt-14"
    >
      <div className="flex flex-col">
        <h2
          id="logout-title"
          className="pr-10 font-primary text-xl font-bold leading-tight text-error"
        >
          Log Out
        </h2>
        <p
          id="logout-description"
          className="mt-4 text-center font-primary text-sm leading-relaxed text-content-light"
        >
          Are you sure you want to log out of your TeamUp account?
        </p>
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="danger" size="md" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
