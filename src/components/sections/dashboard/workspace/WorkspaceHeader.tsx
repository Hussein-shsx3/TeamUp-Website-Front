"use client";

import { LogOut, Settings } from "lucide-react";
import { Heading } from "@/components/ui/typography";
import { Button } from "@/components/ui/buttons";

interface WorkspaceHeaderProps {
  /** Mentor / team admin — show Project Setting */
  isLead: boolean;
}

const WorkspaceHeader = ({ isLead }: WorkspaceHeaderProps) => {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
      <Heading level="h3" className="font-semibold text-content">
        Team Work Space
      </Heading>
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <Button
          type="button"
          variant="secondary"
          size="md"
          className="!border-none !text-error !bg-transparent hover:!bg-error/10 hover:!text-error"
          onClick={() => console.log("leave project (mock)")}
        >
          <LogOut className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
          Leave Project
        </Button>
        {isLead ? (
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => console.log("project settings (mock)")}
          >
            <Settings className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
            Project Setting
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default WorkspaceHeader;
