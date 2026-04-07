"use client";

import Modal from "./Modal";
import { Button } from "@/components/ui/buttons";
import { Heading } from "@/components/ui/typography";

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
      className="max-w-lg w-full p-6 pt-12 sm:p-8"
    >
      <div className="flex flex-col">
        <Heading
          level="h5"
          id="logout-title"
          className="pr-10 font-bold leading-tight text-error"
        >
          Log Out
        </Heading>
        <p
          id="logout-description"
          className="mt-4 font-primary text-sm leading-relaxed text-content-light"
        >
          Are you sure you want to log out of your TeamUp account?
        </p>
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" size="md" onClick={onClose} className="w-full !text-content-light !border-gray-200">
            Cancel
          </Button>
          <Button type="button" variant="danger" size="md" onClick={handleLogout} className="w-full">
            Log Out
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
