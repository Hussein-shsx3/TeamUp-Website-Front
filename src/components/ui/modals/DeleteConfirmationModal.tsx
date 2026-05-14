"use client";

import type { ReactNode } from "react";

import Modal from "./Modal";
import { Heading } from "@/components/ui/typography";
import AuthErrorBanner from "@/components/sections/auth/AuthErrorBanner";

export interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: ReactNode;
  description: ReactNode;
  confirmLabel?: string;
  titleId: string;
  descriptionId: string;
  isConfirming?: boolean;
  statusMessage?: string;
  statusVariant?: "error" | "success";
  closeOnConfirm?: boolean;
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Delete",
  titleId,
  descriptionId,
  isConfirming = false,
  statusMessage,
  statusVariant = "error",
  closeOnConfirm = true,
}: DeleteConfirmationModalProps) => {
  const handleConfirm = async () => {
    try {
      await onConfirm();

      if (closeOnConfirm) {
        onClose();
      }
    } catch {
      return;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeButtonClassName="text-content-muted hover:bg-gray-100 hover:text-content"
      className="max-w-md w-full p-4 sm:p-6"
    >
      <div className="flex flex-col">
        <Heading
          level="h5"
          id={titleId}
          className="pr-10 font-bold leading-tight text-error"
        >
          {title}
        </Heading>
        <div
          id={descriptionId}
          className="mt-4 text-center font-primary text-sm leading-relaxed text-content-light"
        >
          {description}
        </div>
        {statusMessage && (
          <div className="mt-5">
            <AuthErrorBanner
              message={statusMessage}
              variant={statusVariant}
              onClose={isConfirming ? undefined : onClose}
            />
          </div>
        )}
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isConfirming}
          className="mt-5 w-full rounded-xl bg-error py-3.5 font-primary text-sm font-semibold text-content-inverse shadow-sm transition-opacity duration-200 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-error/45 focus-visible:ring-offset-2"
        >
          {isConfirming ? "Deleting..." : confirmLabel}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;