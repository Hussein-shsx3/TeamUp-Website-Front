import { useState } from "react";
import { Button, LinkButton } from "@/components/ui/buttons";
import Input from "@/components/ui/forms/Input";
import Switch from "@/components/ui/forms/Switch";

const approvalRows = [
  {
    id: "require-user-approval",
    title: "Require Admin Approval for New Users",
    description: "The user remains pending until their request to join the platform is approved.",
  },
  {
    id: "auto-activate-users",
    title: "Auto-Activate Users",
    description: "The user joins the platform without the admin's approval.",
  },
  {
    id: "allow-paid-ideas",
    title: "Allow Paid Ideas",
    description: "The user can sell their idea at a reasonable price.",
  },
  {
    id: "require-idea-approval",
    title: "Require Admin Approval for New Project Ideas",
    description: "A user's idea will not be published in the Ideas Marketplace before admin approval.",
  },
  {
    id: "require-team-approval",
    title: "Require Admin Approval for New Project Teams",
    description: "A new graduation project team cannot be created without admin approval.",
  },
];

const ApprovalSettingsSection = () => {
  const [approvalStates, setApprovalStates] = useState<Record<string, boolean>>(
    approvalRows.reduce<Record<string, boolean>>((states, row) => {
      states[row.id] = true;
      return states;
    }, {}),
  );

  return (
    <section className="mt-10 w-full max-w-[1240px] space-y-5">
      <div className="rounded-lg border border-[#dfe6f3] bg-white p-5 sm:p-6">
        <div className="space-y-5">
          {approvalRows.map((row) => (
            <div key={row.id} className="flex items-start justify-between gap-6">
              <div className="max-w-[540px]">
                <p className="font-primary text-[18px] font-medium leading-6 text-content">
                  {row.title}
                </p>
                <p className="mt-1 font-primary text-[10px] leading-5 text-[#5f728f]">
                  {row.description}
                </p>
              </div>

              <Switch
                id={row.id}
                checked={approvalStates[row.id]}
                onChange={(checked) =>
                  setApprovalStates((current) => ({
                    ...current,
                    [row.id]: checked,
                  }))
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-[#dfe6f3] bg-white p-5 sm:p-6">
        <Input
          id="admin-settings-team-members"
          name="maximumTeamMembers"
          label="Maximum Team Members"
          defaultValue={5}
          type="number"
        />
      </div>

      <div className="flex flex-wrap gap-3 pt-1">
        <Button type="button" variant="primary" size="md" className="min-w-[100px]">
          Save
        </Button>
        <LinkButton href="/admin" variant="secondary" size="md" className="min-w-[100px]">
          Cancle
        </LinkButton>
      </div>
    </section>
  );
};

export default ApprovalSettingsSection;