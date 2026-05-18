"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye } from "lucide-react";
import { RemoveMemberModal } from "@/components/ui/modals";
import { TeamMemberRow, MemberOverflowMenu } from "@/components/ui/team";
import type { WorkspaceTeamMember } from "@/types/team";
import WorkspaceCard from "./WorkspaceCard";

interface TeamMembersCardProps {
  members: WorkspaceTeamMember[];
  isLead: boolean;
  isLoading?: boolean;
}

const TeamMembersCard = ({ members, isLead, isLoading = false }: TeamMembersCardProps) => {
  const [memberToRemove, setMemberToRemove] = useState<WorkspaceTeamMember | null>(null);

  return (
    <WorkspaceCard title="Team Member" bodyClassName="min-h-0">
      <div className="flex max-h-[22rem] flex-col gap-0 overflow-y-auto pr-1">
        {isLoading ? (
          <p className="py-4 font-primary text-sm text-content-light">Loading team members...</p>
        ) : members.length === 0 ? (
          <p className="py-4 font-primary text-sm text-content-light">No team members found.</p>
        ) : members.map((m) => (
          <TeamMemberRow
            key={m.id}
            name={m.name}
            role={m.role}
            avatarSrc={m.avatar}
            trailing={
              isLead ? (
                <MemberOverflowMenu
                  memberId={m.userId}
                  memberName={m.name}
                  onDelete={() => setMemberToRemove(m)}
                />
              ) : (
                <Link
                  href={`/dashboard/users/${m.userId}`}
                  className="flex shrink-0 rounded-lg p-2 text-content-light transition-colors hover:bg-gray-50 hover:text-primary"
                  aria-label={`View ${m.name} profile`}
                >
                  <Eye className="h-5 w-5" />
                </Link>
              )
            }
          />
        ))}
      </div>

      <RemoveMemberModal
        isOpen={memberToRemove !== null}
        onClose={() => setMemberToRemove(null)}
        memberName={memberToRemove?.name ?? ""}
        onConfirm={() => {
          if (memberToRemove) console.log("remove member confirmed (mock)", memberToRemove.id);
        }}
      />
    </WorkspaceCard>
  );
};

export default TeamMembersCard;
