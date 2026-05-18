"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/buttons";
import { Input, TagInput } from "@/components/ui/forms";
import { variantClasses, sizeClasses } from "@/components/ui/buttons/buttonStyles";
import { TeamMemberRow, MemberOverflowMenu } from "@/components/ui/team";
import { RemoveMemberModal, ReassignTeamAdminModal } from "@/components/ui/modals";
import { TEAM_WORKSPACE_HREF } from "@/mock/Dashboard";
import type { WorkspaceTeamMember } from "@/hooks/useTeam";

export interface ProjectTeamManagementFormProps {
  initialCapacity: number;
  initialRequiredSkills: string[];
  initialMembers: WorkspaceTeamMember[];
  isLoading?: boolean;
}

const sortMembersForDisplay = (members: WorkspaceTeamMember[]) =>
  [...members].sort((a, b) => {
    if (a.isTeamAdmin && !b.isTeamAdmin) return -1;
    if (!a.isTeamAdmin && b.isTeamAdmin) return 1;
    return a.name.localeCompare(b.name);
  });

const ProjectTeamManagementForm = ({
  initialCapacity,
  initialRequiredSkills,
  initialMembers,
  isLoading = false,
}: ProjectTeamManagementFormProps) => {
  const [capacity, setCapacity] = useState(String(initialCapacity));
  const [requiredSkills, setRequiredSkills] = useState<string[]>(initialRequiredSkills);
  const [members, setMembers] = useState(initialMembers);
  const [memberToRemove, setMemberToRemove] = useState<WorkspaceTeamMember | null>(null);
  const [reassignAdminOpen, setReassignAdminOpen] = useState(false);

  useEffect(() => {
    setCapacity(String(initialCapacity));
    setRequiredSkills(initialRequiredSkills);
    setMembers(initialMembers);
  }, [initialCapacity, initialRequiredSkills, initialMembers]);

  const orderedMembers = useMemo(() => sortMembersForDisplay(members), [members]);

  const currentAdmin = useMemo(
    () => members.find((m) => m.isTeamAdmin),
    [members],
  );

  const newAdminSelectOptions = useMemo(() => {
    return members
      .filter(
        (m) =>
          !m.isTeamAdmin &&
          !m.role.toLowerCase().includes("mentor"),
      )
      .map((m, index) => ({
        value: String(m.id),
        label: `Student ${index + 1}`,
      }));
  }, [members]);

  const handleSave = () => {
    console.log("save team settings (mock)", {
      capacity: Number(capacity),
      requiredSkills,
    });
  };

  return (
    <div className="space-y-5 p-4 sm:p-6 md:p-8">
      <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
        <Input
          id="team-capacity"
          label="Team capacity"
          type="number"
          min={1}
          inputMode="numeric"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
        <TagInput
          id="team-required-skills"
          label="Required skills"
          value={requiredSkills}
          onChange={setRequiredSkills}
          placeholder="Type and press Enter"
          variant="bordered"
        />
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5">
        <p className="mb-3 font-primary text-sm font-medium text-content-light">Team Member</p>
        <div className="flex max-h-[22rem] flex-col overflow-y-auto pr-1">
          {isLoading ? (
            <p className="py-4 font-primary text-sm text-content-light">Loading team members...</p>
          ) : orderedMembers.length === 0 ? (
            <p className="py-4 font-primary text-sm text-content-light">No team members found.</p>
          ) : orderedMembers.map((m) =>
            m.isTeamAdmin ? (
              <TeamMemberRow
                key={m.id}
                name={m.name}
                role={m.role}
                avatarSrc={m.avatar}
                trailing={
                  <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                    <span
                      className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary-light
                        px-2.5 py-1 text-center font-primary text-xs font-semibold text-primary"
                    >
                      Team Admin
                    </span>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="whitespace-nowrap"
                      onClick={() => setReassignAdminOpen(true)}
                    >
                      Reset a new admin
                    </Button>
                  </div>
                }
              />
            ) : (
              <TeamMemberRow
                key={m.id}
                name={m.name}
                role={m.role}
                avatarSrc={m.avatar}
                trailing={
                  <MemberOverflowMenu
                    memberId={m.id}
                    memberName={m.name}
                    onDelete={() => setMemberToRemove(m)}
                  />
                }
              />
            ),
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button type="button" variant="primary" size="md" onClick={handleSave}>
          Save
        </Button>
        <Link
          href={TEAM_WORKSPACE_HREF}
          className={`inline-flex items-center justify-center rounded-lg font-primary font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${variantClasses.secondary} ${sizeClasses.md}`}
        >
          Cancel
        </Link>
      </div>

      <RemoveMemberModal
        isOpen={memberToRemove !== null}
        onClose={() => setMemberToRemove(null)}
        memberName={memberToRemove?.name ?? ""}
        onConfirm={() => {
          if (memberToRemove) console.log("remove member (mock)", memberToRemove.id);
        }}
      />

      <ReassignTeamAdminModal
        isOpen={reassignAdminOpen}
        onClose={() => setReassignAdminOpen(false)}
        currentAdminName={currentAdmin?.name ?? "Student name"}
        newAdminOptions={newAdminSelectOptions}
      />
    </div>
  );
};

export default ProjectTeamManagementForm;
