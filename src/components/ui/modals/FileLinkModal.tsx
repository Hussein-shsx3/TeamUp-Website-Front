"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import { Button } from "@/components/ui/buttons";
import { Input } from "@/components/ui/forms";

export interface FileLinkValue {
  name: string;
  url: string;
}

export interface FileLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: FileLinkValue) => void;
  title?: string;
  submitLabel?: string;
  nameLabel?: string;
  urlLabel?: string;
  initialName?: string;
  initialUrl?: string;
}

const FileLinkModal = ({
  isOpen,
  onClose,
  onSubmit,
  title = "Add File Link",
  submitLabel = "Save Link",
  nameLabel = "File name",
  urlLabel = "File link",
  initialName = "",
  initialUrl = "",
}: FileLinkModalProps) => {
  const [name, setName] = useState(initialName);
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    if (!isOpen) {
      setName(initialName);
      setUrl(initialUrl);
    }
  }, [initialName, initialUrl, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-full max-w-lg p-6 sm:p-8"
      closeButtonClassName="text-content-muted hover:bg-gray-100 hover:text-content"
    >
      <div className="flex flex-col gap-5">
        <h2 className="pr-10 font-primary text-lg font-bold leading-tight text-content">
          {title}
        </h2>

        <Input
          id="file-link-name"
          label={nameLabel}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Final report"
        />

        <Input
          id="file-link-url"
          label={urlLabel}
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
        />

        <Button
          type="button"
          variant="primary"
          size="md"
          className="w-full justify-center"
          disabled={!name.trim() || !url.trim()}
          onClick={() => {
            onSubmit({ name: name.trim(), url: url.trim() });
            onClose();
          }}
        >
          {submitLabel}
        </Button>
      </div>
    </Modal>
  );
};

export default FileLinkModal;