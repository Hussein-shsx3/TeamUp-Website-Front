"use client";

import { useState } from "react";
import { LockOpen, ChevronLeft } from "lucide-react";
import { Input, SubmitButton } from "@/components/ui/forms";
import { Heading } from "@/components/ui/typography";

interface EmailStepProps {
  onSendCode: (email: string) => void;
  onBack: () => void;
  isLoading?: boolean;
  initialEmail?: string;
}

const EmailStep = ({
  onSendCode,
  onBack,
  isLoading = false,
  initialEmail = "",
}: EmailStepProps) => {
  const [email, setEmail] = useState(initialEmail);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSendCode(email.trim());
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center">
        <LockOpen size={26} className="text-primary" aria-hidden="true" />
      </div>

      <Heading level="h4" className="text-primary text-center font-semibold">
        Forgot Password?
      </Heading>

      <p className="font-primary text-sm text-content text-center leading-relaxed max-w-[320px]">
        Enter the email address associated with your account and we&apos;ll send
        you a code.
      </p>

      <div className="w-full">
        <Input
          id="forgot-password-email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@university.edu"
        />
      </div>

      <SubmitButton
        label={isLoading ? "Sending..." : "Send Code"}
        onClick={handleSubmit}
        disabled={isLoading || !email.trim()}
      />

      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 font-primary text-xs text-content-light
          hover:text-primary transition-colors duration-150 self-start"
        aria-label="Back to Login"
      >
        <ChevronLeft size={14} aria-hidden="true" className="text-content-light" />
        <span>Back to Login</span>
      </button>
    </div>
  );
};

export default EmailStep;
