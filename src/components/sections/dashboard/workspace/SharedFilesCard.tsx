"use client";

import { Download, File } from "lucide-react";
import type { MockWorkspaceFile } from "@/mock/TeamWorkspace";
import WorkspaceCard from "./WorkspaceCard";
import { Button, IconButton } from "@/components/ui/buttons";

interface SharedFilesCardProps {
  files: MockWorkspaceFile[];
  isLead: boolean;
}

const SharedFilesCard = ({ files, isLead }: SharedFilesCardProps) => {
  return (
    <WorkspaceCard title="Shared Files">
      <ul className="mb-4 flex flex-col gap-3">
        {files.map((f) => (
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
                uploaded by {f.uploadedBy} · {f.sizeLabel}
              </p>
            </div>
            <IconButton
              type="button"
              variant="ghost"
              size="sm"
              aria-label={`Download ${f.name}`}
              onClick={() => console.log("download (mock)", f.id)}
            >
              <Download className="text-primary" />
            </IconButton>
          </li>
        ))}
      </ul>
      <Button
        type="button"
        variant="primary"
        size="md"
        disabled={!isLead}
        className={`w-full ${!isLead ? "bg-gray-100 text-content-muted hover:bg-gray-100" : ""}`}
        onClick={() => console.log("add file (mock)")}
      >
        Add New File
      </Button>
    </WorkspaceCard>
  );
};

export default SharedFilesCard;
