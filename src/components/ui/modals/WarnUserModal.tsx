"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import { Button } from "@/components/ui/buttons";
import { Heading } from "@/components/ui/typography";

export interface WarnUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (payload: { reason: string; message: string }) => void;
  userName: string;
}

const WarnUserModal = ({ isOpen, onClose, onConfirm, userName }: WarnUserModalProps) => {
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setReason("");
      setMessage("");
    }
  }, [isOpen]);

  const handleConfirm = () => {
    onConfirm({ reason, message });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeButtonClassName="text-content hover:bg-gray-100 hover:text-content"
      className="max-w-lg w-full p-4 sm:p-6"
    >
      <div className="flex flex-col">
        <Heading level="h5" id="warn-user-title" className="pr-10 font-bold leading-tight text-primary">
          Warn User <span className="text-content-light text-base">@{userName}</span>
        </Heading>

        <label className="mt-4 block">
          <span className="mb-2 block font-primary text-sm text-content-light">Warn Reason</span>
          <input
            type="text"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 font-primary text-sm text-content outline-none transition-colors placeholder:text-slate-300 focus:border-primary"
          />
        </label>

        <label className="mt-4 block">
          <span className="mb-2 block font-primary text-sm text-content-light">Warn Message</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={4}
            className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 font-primary text-sm text-content outline-none transition-colors placeholder:text-slate-300 focus:border-primary"
          />
        </label>

        <div className="mt-5 flex gap-2.5">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onClose}
            className="w-full !border-gray-200 !text-content"
          >
            Cancel
          </Button>
          <Button type="button" variant="primary" size="md" onClick={handleConfirm} className="w-full">
            Warn User
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default WarnUserModal;