"use client";

import { Breadcrumb } from "@/components/ui/navigation";
import { Button, IconButton } from "@/components/ui/buttons";
import { Heading } from "@/components/ui/typography";

interface UserDetailsPageHeaderProps {
  userName: string;
  onApprove?: () => void;
  onReject?: () => void;
}

const UserDetailsPageHeader = ({ userName, onApprove, onReject }: UserDetailsPageHeaderProps) => {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "User management", href: "/admin/users" },
          { label: "user Details" },
        ]}
      />

      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <Heading level="h4" className="font-semibold text-content">
            Account Overview
          </Heading>
          <p className="mt-1 font-primary text-sm text-slate-500">{userName}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={onApprove}
            className="h-10 px-4 text-sm shadow-none"
          >
            Approve
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onReject}
            className="h-10 border-rose-200 px-5 text-sm !text-rose-500 hover:border-rose-300 hover:!bg-rose-50"
          >
            Reject
          </Button>
          <IconButton
            type="button"
            variant="ghost"
            size="md"
            aria-label="More actions"
            className="text-slate-500 hover:bg-slate-100"
          >
            ⋮
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default UserDetailsPageHeader;