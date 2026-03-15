"use client";

import { useMemo, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { PasswordInput, SubmitButton } from "@/components/ui/forms";
import { Heading } from "@/components/ui/typography";

interface ResetPasswordStepProps {
  onReset: (newPassword: string, confirmPassword: string) => void;
  onBack: () => void;
  isLoading?: boolean;
}

const ResetPasswordStep = ({
  onReset,
  onBack,
  isLoading = false,
}: ResetPasswordStepProps) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const canSubmit = useMemo(() => {
    if (!newPassword || !confirmPassword) return false;
    return newPassword === confirmPassword;
  }, [newPassword, confirmPassword]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    onReset(newPassword, confirmPassword);
  };

  return (
    <div className="flex flex-col gap-5">
      <Heading level="h4" className="text-primary font-semibold">
        Reset Password
      </Heading>

      <div className="flex flex-col gap-4">
        <PasswordInput
          id="reset-new-password"
          name="newPassword"
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="enter Password"
        />
        <PasswordInput
          id="reset-confirm-password"
          name="confirmPassword"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="enter Password"
        />
      </div>

      {!canSubmit && confirmPassword.length > 0 && (
        <p className="font-primary text-xs text-red-400 -mt-1">
          Passwords do not match.
        </p>
      )}

      <SubmitButton
        label={isLoading ? "Updating..." : "Update Password"}
        onClick={handleSubmit}
        disabled={isLoading || !canSubmit}
      />

      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 font-primary text-xs text-content-light
          hover:text-primary transition-colors duration-150 self-start"
        aria-label="Back"
      >
        <ChevronLeft size={14} aria-hidden="true" className="text-content-light" />
        <span>Back</span>
      </button>
    </div>
  );
};

export default ResetPasswordStep;
