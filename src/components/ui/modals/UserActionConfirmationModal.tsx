"use client";

import type { ReactNode } from "react";
import Modal from "./Modal";
import { Button } from "@/components/ui/buttons";
import { Heading } from "@/components/ui/typography";

interface UserActionConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  userName: string;
  description: ReactNode;
  confirmLabel: string;
  titleId: string;
  descriptionId: string;
  titleClassName: string;
  confirmButtonClassName: string;
}

const UserActionConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  userName,
  description,
  confirmLabel,
  titleId,
  descriptionId,
  titleClassName,
  confirmButtonClassName,
}: UserActionConfirmationModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeButtonClassName="text-content hover:bg-gray-100 hover:text-content"
      className="max-w-md w-full p-4 sm:p-6"
    >
      <div className="flex flex-col">
        <Heading level="h5" id={titleId} className={`pr-10 font-bold leading-tight ${titleClassName}`}>
          {title} <span className="text-content-light text-base">@{userName}</span>
        </Heading>
        <div
          id={descriptionId}
          className="mt-4 text-center font-primary text-sm leading-relaxed text-content-light"
        >
          {description}
        </div>
        <div className="mt-5 flex gap-2.5">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onClose}
            className="w-full !border-gray-200 !text-content"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={handleConfirm}
            className={`w-full ${confirmButtonClassName}`}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UserActionConfirmationModal;