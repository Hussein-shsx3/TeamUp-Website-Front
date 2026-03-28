"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Eye, MoreVertical, Trash2 } from "lucide-react";
import type { MockWorkspaceMember } from "@/mock/TeamWorkspace";
import WorkspaceCard from "./WorkspaceCard";
import { IconButton } from "@/components/ui/buttons";

interface TeamMembersCardProps {
  members: MockWorkspaceMember[];
  isLead: boolean;
}

const TeamMembersCard = ({ members, isLead }: TeamMembersCardProps) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <WorkspaceCard title="Team Member" bodyClassName="min-h-0">
      <div ref={containerRef} className="flex max-h-[22rem] flex-col gap-0 overflow-y-auto pr-1">
        {members.map((m) => (
          <div
            key={m.id}
            className="flex items-center gap-3 border-b border-gray-100 py-3 last:border-b-0"
          >
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-gray-100">
              <Image
                src={m.avatar}
                alt=""
                fill
                unoptimized
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-primary text-sm font-medium text-content">{m.name}</p>
              <p className="truncate font-primary text-xs text-content-light">{m.role}</p>
            </div>
            {isLead ? (
              <div className="relative shrink-0">
                <IconButton
                  type="button"
                  variant="ghost"
                  size="sm"
                  aria-label={`Actions for ${m.name}`}
                  aria-expanded={openMenuId === m.id}
                  onClick={() => setOpenMenuId((id) => (id === m.id ? null : m.id))}
                >
                  <MoreVertical className="text-content-light" />
                </IconButton>
                {openMenuId === m.id ? (
                  <div
                    className="absolute right-0 z-20 mt-1 w-40 rounded-lg border border-gray-100 bg-white py-1 shadow-lg"
                    role="menu"
                  >
                    <Link
                      href={`/dashboard/students/${m.id}`}
                      className="flex items-center gap-2 px-3 py-2 font-primary text-xs text-content hover:bg-gray-50"
                      role="menuitem"
                      onClick={() => setOpenMenuId(null)}
                    >
                      <Eye className="h-3.5 w-3.5 text-content-light" />
                      Profile
                    </Link>
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 px-3 py-2 font-primary text-xs text-error hover:bg-error/5"
                      role="menuitem"
                      onClick={() => {
                        setOpenMenuId(null);
                        console.log("remove member (mock)", m.id);
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                href={`/dashboard/students/${m.id}`}
                className="shrink-0 rounded-lg p-2 text-content-light transition-colors hover:bg-gray-50 hover:text-primary"
                aria-label={`View ${m.name} profile`}
              >
                <Eye className="h-5 w-5" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </WorkspaceCard>
  );
};

export default TeamMembersCard;
