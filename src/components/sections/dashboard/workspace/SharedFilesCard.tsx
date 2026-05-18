"use client";

import { useEffect, useState } from "react";
import { File, Link as LinkIcon } from "lucide-react";
import { FileLinkModal } from "@/components/ui/modals";
import WorkspaceCard from "./WorkspaceCard";
import { Button } from "@/components/ui/buttons";
import type { WorkspaceFileItem } from "@/hooks/useTeam";

interface SharedFilesCardProps {
  files: WorkspaceFileItem[];
  isLead: boolean;
  isLoading?: boolean;
}

function formatLinkLabel(linkUrl: string): string {
  try {
    return new URL(linkUrl).host;
  } catch {
    return linkUrl;
  }
}

const SharedFilesCard = ({ files: initialFiles, isLead, isLoading = false }: SharedFilesCardProps) => {
  const [files, setFiles] = useState(initialFiles);
  const [linkOpen, setLinkOpen] = useState(false);

  useEffect(() => {
    setFiles(initialFiles);
  }, [initialFiles]);

  return (
    <WorkspaceCard title="Shared Files">
      <ul className="mb-4 flex flex-col gap-3">
        {isLoading ? (
          <li className="py-4 font-primary text-sm text-content-light">Loading files...</li>
        ) : files.length === 0 ? (
          <li className="py-4 font-primary text-sm text-content-light">No shared files yet.</li>
        ) : files.map((f) => (
          <li
            key={f.id}
            className="flex items-start gap-3 rounded-lg border border-transparent py-1 transition-colors hover:border-gray-100 hover:bg-gray-50/80"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
              <File className="h-5 w-5 text-primary" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-primary text-sm font-medium text-content">{f.name}</p>
              <p className="mt-0.5 font-primary text-[11px] text-content-light">
                linked by {f.uploadedBy} · {formatLinkLabel(f.linkUrl)}
              </p>
            </div>
            <a
              href={f.linkUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${f.name}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary-light"
            >
              <LinkIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
      <Button
        type="button"
        variant="primary"
        size="md"
        disabled={!isLead}
        className={`w-full ${!isLead ? "bg-gray-100 text-content-muted hover:bg-gray-100" : ""}`}
        onClick={() => setLinkOpen(true)}
      >
        Add File Link
      </Button>

      <FileLinkModal
        isOpen={linkOpen}
        onClose={() => setLinkOpen(false)}
        onSubmit={(value) => {
          setFiles((prev) => [
            ...prev,
            {
              id: `${Date.now()}`,
              name: value.name,
              uploadedBy: "you",
              linkUrl: value.url,
              sizeLabel: formatLinkLabel(value.url),
            },
          ]);
          console.log("add file link")
        }}
      />
    </WorkspaceCard>
  );
};

export default SharedFilesCard;
