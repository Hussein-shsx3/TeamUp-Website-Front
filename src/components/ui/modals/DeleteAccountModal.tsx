"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { authService } from "@/services/auth.service";

export interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteAccountModal = ({
  isOpen,
  onClose,
}: DeleteAccountModalProps) => {
  const router = useRouter();
  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFormError("");
      setSuccessMessage("");
      setIsDeleting(false);
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
        redirectTimerRef.current = null;
      }
    }

    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
        redirectTimerRef.current = null;
      }
    };
  }, [isOpen]);

  const handleConfirm = async () => {
    if (successMessage) {
      onClose();
      router.replace("/auth/signin");
      return;
    }

    setFormError("");
    setSuccessMessage("");
    setIsDeleting(true);

    try {
      await authService.deleteAccount();

      setSuccessMessage(
        "Your account has been marked for deletion. It will be permanently removed after 90 days.",
      );

      redirectTimerRef.current = setTimeout(() => {
        onClose();
        router.replace("/auth/signin");
      }, 1200);
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Failed to delete account.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DeleteConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Delete Account"
      titleId="delete-account-title"
      descriptionId="delete-account-description"
      closeOnConfirm={false}
      isConfirming={isDeleting}
      confirmLabel={successMessage ? "Continue" : "Delete Account"}
      statusMessage={formError || successMessage}
      statusVariant={successMessage ? "success" : "error"}
      description={
        <div className="space-y-3">
          <p>
            Are you sure that you want to delete your account? This will hide
            your account immediately and start the 90-day retention period.
          </p>
          <p>
            After 90 days, the account and related data are permanently
            removed.
          </p>
        </div>
      }
    />
  );
};

export default DeleteAccountModal;
