"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { DeleteAccountModal } from "@/components/ui/modals";

export interface DeleteAccountButtonProps {
  className?: string;
  /** Wider touch target + banner styling for mobile bottom strip. */
  variant?: "default" | "banner";
}

const DeleteAccountButton = ({
  className = "",
  variant = "default",
}: DeleteAccountButtonProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const base =
    "flex w-full items-center gap-3 rounded-xl text-left font-primary text-sm font-medium text-error transition-colors duration-150 hover:bg-error/10";

  const variantClass =
    variant === "banner"
      ? "justify-center border border-error/25 bg-error/5 px-4 py-3.5 shadow-sm"
      : "px-3 py-2.5";

  return (
    <>
      <button
        type="button"
        className={`${base} ${variantClass} ${className}`.trim()}
        onClick={() => setModalOpen(true)}
      >
        <AlertTriangle size={18} aria-hidden="true" className="shrink-0" />
        <span>Delete Account</span>
      </button>

      <DeleteAccountModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default DeleteAccountButton;
