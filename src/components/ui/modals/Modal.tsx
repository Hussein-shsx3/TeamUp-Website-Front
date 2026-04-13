"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  closeButtonClassName?: string;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  className = "",
  showCloseButton = true,
  closeOnBackdrop = true,
  closeButtonClassName = "",
}: ModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ── lock page scroll ── */
  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    const html = document.documentElement;
    const body = document.body;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  /* ── close on Escape ── */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    /*
     * data-lenis-prevent: Lenis (smoothWheel) otherwise captures wheel and scrolls the page
     * instead of native overflow on this subtree — see @studio-freight/lenis README.
     * overflow-hidden: do not scroll the overlay; only the inner panel scrolls.
     */
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[60] overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />

      <div className="relative flex min-h-full items-center justify-center p-4 pointer-events-none">
        <div
          ref={panelRef}
          className={`relative z-10 my-8 w-full pointer-events-auto bg-white rounded-lg shadow-2xl animate-modal-in ${className}`}
        >
          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className={`absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full
                transition-colors duration-200
                ${closeButtonClassName || "text-content-muted hover:bg-gray-100 hover:text-content"}`}
            >
              <X size={18} aria-hidden="true" />
            </button>
          )}
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
