"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import { IconButton } from "@/components/ui/buttons";
import type { AdminTeamReportRecord } from "@/mock/AdminTeams";
import TeamsActionsMenu from "./TeamsActionsMenu";
import TeamStatusBadge from "./TeamStatusBadge";

interface TeamsTableProps {
  teams: AdminTeamReportRecord[];
  selectedIds: Set<number>;
  onToggleTeam: (id: number) => void;
  onToggleSelectAll: (teamIds: number[]) => void;
  onViewReport: (team: AdminTeamReportRecord) => void;
  onReject: (team: AdminTeamReportRecord) => void;
}

const TeamsTable = ({
  teams,
  selectedIds,
  onToggleTeam,
  onToggleSelectAll,
  onViewReport,
  onReject,
}: TeamsTableProps) => {
  const selectAllRef = useRef<HTMLInputElement>(null);
  const allSelected = teams.length > 0 && teams.every((team) => selectedIds.has(team.id));
  const someSelected = teams.some((team) => selectedIds.has(team.id));

  useEffect(() => {
    if (!selectAllRef.current) return;
    selectAllRef.current.indeterminate = someSelected && !allSelected;
  }, [allSelected, someSelected]);

  const teamIds = useMemo(() => teams.map((team) => team.id), [teams]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-[980px] w-full border-separate border-spacing-0">
        <thead>
          <tr className="bg-slate-50/80 text-left font-primary text-[11px] uppercase tracking-wide text-slate-400">
            <th className="w-12 border-b border-slate-100 px-4 py-4">
              <input
                ref={selectAllRef}
                type="checkbox"
                checked={allSelected}
                onChange={() => onToggleSelectAll(teamIds)}
                aria-label="Select all teams on the current page"
                className="h-4 w-4 cursor-pointer rounded border-slate-300 text-primary accent-primary focus:ring-primary"
              />
            </th>
            <th className="border-b border-slate-100 px-4 py-4">Team Name</th>
            <th className="border-b border-slate-100 px-4 py-4">Team Mentor</th>
            <th className="border-b border-slate-100 px-4 py-4">Status</th>
            <th className="border-b border-slate-100 px-4 py-4">Members</th>
            <th className="border-b border-slate-100 px-4 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => {
            const isSelected = selectedIds.has(team.id);

            return (
              <tr
                key={team.id}
                className={`text-sm text-content transition-colors hover:bg-slate-50/80 ${
                  isSelected ? "bg-primary/5" : ""
                }`}
              >
                <td className="border-b border-slate-100 px-4 py-4 align-middle">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onClick={(event) => event.stopPropagation()}
                    onChange={(event) => {
                      event.stopPropagation();
                      onToggleTeam(team.id);
                    }}
                    aria-label={`Select ${team.teamName}`}
                    className="h-4 w-4 cursor-pointer rounded border-slate-300 text-primary accent-primary focus:ring-primary"
                  />
                </td>
                <td className="border-b border-slate-100 px-4 py-4 font-primary text-sm font-medium text-content align-middle">
                  {team.teamName}
                </td>
                <td className="border-b border-slate-100 px-4 py-4 align-middle">
                  {team.teamMentorAvatar ? (
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                        <Image
                          src={team.teamMentorAvatar}
                          alt={team.teamMentor}
                          fill
                          unoptimized
                          className="object-cover"
                          sizes="32px"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-primary text-sm font-medium text-content">
                          {team.teamMentor}
                        </p>
                        <p className="truncate font-primary text-xs text-slate-500">Mentor</p>
                      </div>
                    </div>
                  ) : (
                    <span className="font-primary text-sm text-slate-600">{team.teamMentor}</span>
                  )}
                </td>
                <td className="border-b border-slate-100 px-4 py-4 align-middle">
                  <TeamStatusBadge status={team.status} />
                </td>
                <td className="border-b border-slate-100 px-4 py-4 align-middle">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center">
                      {team.members.slice(0, 3).map((member, index) => (
                        <div
                          key={member.name}
                          className={`relative h-7 w-7 overflow-hidden rounded-full ring-2 ring-white ${
                            index > 0 ? "-ml-2" : ""
                          }`}
                        >
                          <Image
                            src={member.avatar}
                            alt={member.name}
                            fill
                            unoptimized
                            className="object-cover"
                            sizes="28px"
                          />
                        </div>
                      ))}
                    </div>

                    {team.members.length > 3 ? (
                      <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-white ring-2 ring-white">
                        +{team.members.length - 3}
                      </span>
                    ) : null}
                  </div>
                </td>
                <td className="border-b border-slate-100 px-4 py-4 text-right align-middle">
                  <div className="inline-flex items-center justify-end gap-1">
                    <IconButton
                      type="button"
                      variant="ghost"
                      size="sm"
                      aria-label={`View details for ${team.teamName}`}
                      className="rounded-full text-content-light hover:bg-slate-100"
                      onClick={(event) => {
                        event.stopPropagation();
                        onViewReport(team);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </IconButton>

                    <TeamsActionsMenu team={team} onReject={onReject} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {teams.length === 0 ? (
        <div className="border-b border-slate-100 px-4 py-16 text-center font-primary text-sm text-slate-500">
          No teams found for the current search and filter settings.
        </div>
      ) : null}
    </div>
  );
};

export default TeamsTable;