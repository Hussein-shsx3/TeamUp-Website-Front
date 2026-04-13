"use client";

import type { AdminUserDetailRecord } from "@/mock/AdminUsers";
import UserDetailsAcademicCard from "./UserDetailsAcademicCard";
import UserDetailsPageHeader from "./UserDetailsPageHeader";
import UserDetailsProfileCard from "./UserDetailsProfileCard";

interface StudentDetailsViewProps {
  user: AdminUserDetailRecord;
  onApprove?: () => void;
  onReject?: () => void;
}

const StudentDetailsView = ({ user, onApprove, onReject }: StudentDetailsViewProps) => {
  return (
    <div className="flex flex-col">
      <UserDetailsPageHeader userName={user.name} onApprove={onApprove} onReject={onReject} />

      <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)] lg:grid-cols-[320px_minmax(0,1fr)] lg:p-5">
        <UserDetailsProfileCard user={user} />

        <UserDetailsAcademicCard
          university={user.university}
          major={user.major}
          joinedTeam={user.joinedTeam}
          rightLabel="Skills"
          rightContent={(
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <span key={skill} className="rounded bg-primary-light px-2.5 py-1 font-primary text-[11px] text-primary">
                  {skill}
                </span>
              ))}
            </div>
          )}
        />
      </section>
    </div>
  );
};

export default StudentDetailsView;
