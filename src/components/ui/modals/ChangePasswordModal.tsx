"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import PasswordInput from "@/components/ui/forms/PasswordInput";
import { Button } from "@/components/ui/buttons";
import { Heading } from "@/components/ui/typography";

export interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal = ({ isOpen, onClose }: ChangePasswordModalProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("update password (mock)", {
      currentPassword,
      newPassword,
      confirmPassword,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeButtonClassName="text-content-muted hover:bg-gray-100 hover:text-content"
      className="max-w-md w-full p-6 pt-12 sm:p-8 sm:pt-12"
    >
      <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
        <Heading
          level="h3"
          className="mb-6 pr-8 font-primary font-bold text-content !text-xl !leading-tight md:!text-2xl"
        >
          Change Password
        </Heading>

        <div className="flex flex-col gap-5">
          <PasswordInput
            id="change-password-current"
            name="currentPassword"
            label="Current Password"
            placeholder="enter Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoComplete="current-password"
          />
          <PasswordInput
            id="change-password-new"
            name="newPassword"
            label="New Password"
            placeholder="enter Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />
          <PasswordInput
            id="change-password-confirm"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="mt-8 w-full"
        >
          Update Password
        </Button>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
