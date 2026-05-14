"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import PasswordInput from "@/components/ui/forms/PasswordInput";
import { Button } from "@/components/ui/buttons";
import { Heading } from "@/components/ui/typography";
import { useChangePassword } from "@/hooks/useAuth";
import AuthErrorBanner from "@/components/sections/auth/AuthErrorBanner";

export interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal = ({ isOpen, onClose }: ChangePasswordModalProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const changePasswordMutation = useChangePassword();

  useEffect(() => {
    if (!isOpen) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setFormError("");
      setSuccessMessage("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (successMessage) {
      onClose();
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      setFormError("All password fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setFormError("New password and confirmation do not match.");
      return;
    }

    setFormError("");
    setSuccessMessage("");

    try {
      await changePasswordMutation.mutateAsync({
        currentPassword,
        newPassword,
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSuccessMessage("Password updated successfully.");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Failed to update password.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeButtonClassName="text-content-muted hover:bg-gray-100 hover:text-content"
      className="max-w-xl w-full p-6 pt-12 sm:p-8 sm:pt-14"
    >
      <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
        <Heading
          level="h3"
          className="mb-8 pr-8 font-primary font-bold text-content !text-2xl !leading-tight"
        >
          Change Password
        </Heading>

        {(formError || successMessage) && (
          <div className="mb-6">
            <AuthErrorBanner
              message={formError || successMessage}
              variant={successMessage ? "success" : "error"}
              onClose={() => {
                setFormError("");
                setSuccessMessage("");
              }}
            />
          </div>
        )}

        <div className="flex flex-col gap-6">
          <PasswordInput
            id="change-password-current"
            name="currentPassword"
            label="Current Password"
            placeholder="enter Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoComplete="current-password"
            disabled={changePasswordMutation.isPending || Boolean(successMessage)}
          />
          <PasswordInput
            id="change-password-new"
            name="newPassword"
            label="New Password"
            placeholder="enter Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
            disabled={changePasswordMutation.isPending || Boolean(successMessage)}
          />
          <PasswordInput
            id="change-password-confirm"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            disabled={changePasswordMutation.isPending || Boolean(successMessage)}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="mt-10 w-full py-4 text-lg"
          disabled={changePasswordMutation.isPending}
        >
          {successMessage
            ? "Close"
            : changePasswordMutation.isPending
              ? "Updating..."
              : "Update Password"}
        </Button>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
