"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modals";
import { UniversityLoginStep } from "./university";

interface UniversityAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (universityId: string, password: string) => void;
}

const UniversityAuthModal = ({
  isOpen,
  onClose,
  onLoginSuccess,
}: UniversityAuthModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const handleLogin = (universityId: string, password: string) => {
    setIsLoading(true);
    // TODO: replace with real API call
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess?.(universityId, password);
    }, 800);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[520px] p-6 md:p-8"
    >
      <UniversityLoginStep
        onSubmit={handleLogin}
        onBack={handleClose}
        isLoading={isLoading}
      />
    </Modal>
  );
};

export default UniversityAuthModal;
