"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye } from "lucide-react";
import type { MockWorkspaceMember } from "@/mock/TeamWorkspace";
import { RemoveMemberModal } from "@/components/ui/modals";
import { TeamMemberRow, MemberOverflowMenu } from "@/components/ui/team";
import WorkspaceCard from "./WorkspaceCard";

interface TeamMembersCardProps {
  members: MockWorkspaceMember[];
  isLead: boolean;
}

const TeamMembersCard = ({ members, isLead }: TeamMembersCardProps) => {
  const [memberToRemove, setMemberToRemove] = useState<MockWorkspaceMember | null>(null);

  return (
    <WorkspaceCard title="Team Member" bodyClassName="min-h-0">
      <div className="flex max-h-[22rem] flex-col gap-0 overflow-y-auto pr-1">
        {members.map((m) => (
          <TeamMemberRow
            key={m.id}
            name={m.name}
            role={m.role}
            avatarSrc={m.avatar}
            trailing={
              isLead ? (
                <MemberOverflowMenu
                  memberId={m.id}
                  memberName={m.name}
                  onDelete={() => setMemberToRemove(m)}
                />
              ) : (
                <Link
                  href={`/dashboard/users/${m.id}`}
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
