"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modals";
import { EmailStep, VerifyCodeStep, ResetPasswordStep } from "./forgotPassword";

type ForgotStep = "email" | "verify" | "reset";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: ForgotStep;
  initialEmail?: string;
}

const ForgotPasswordModal = ({
  isOpen,
  onClose,
  initialStep = "email",
  initialEmail = "",
}: ForgotPasswordModalProps) => {
  const [step, setStep] = useState<ForgotStep>(initialStep);
  const [email, setEmail] = useState(initialEmail);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setStep(initialStep);
    setEmail(initialEmail);
  }, [isOpen, initialStep, initialEmail]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(initialStep);
      setEmail(initialEmail);
      setIsLoading(false);
    }, 300);
  };

  const handleSendCode = (emailInput: string) => {
    setIsLoading(true);
    setEmail(emailInput);
    setTimeout(() => {
      setIsLoading(false);
      setStep("verify");
    }, 700);
  };

  const handleVerify = (code: string) => {
    setIsLoading(true);
    console.log("Verify code:", code);
    setTimeout(() => {
      setIsLoading(false);
      setStep("reset");
    }, 700);
  };

  const handleReset = (newPassword: string, confirmPassword: string) => {
    setIsLoading(true);
    console.log("Reset password payload:", { email, newPassword, confirmPassword });
    setTimeout(() => {
      setIsLoading(false);
      handleClose();
    }, 800);
  };

  const handleResend = () => {
    console.log("Resend code to:", email);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[520px] p-6 md:p-8"
    >
      {step === "email" && (
        <EmailStep
          onSendCode={handleSendCode}
          onBack={handleClose}
          isLoading={isLoading}
          initialEmail={email}
        />
      )}

      {step === "verify" && (
        <VerifyCodeStep
          email={email}
          onVerify={handleVerify}
          onResend={handleResend}
          onBack={() => setStep("email")}
          isLoading={isLoading}
        />
      )}

      {step === "reset" && (
        <ResetPasswordStep
          onReset={handleReset}
          onBack={() => setStep("verify")}
          isLoading={isLoading}
        />
      )}
    </Modal>
  );
};

export default ForgotPasswordModal;
