"use client";

import { useState } from "react";
import {
  ApproveUserModal,
  RejectUserModal,
} from "@/components/ui/modals";
import type { AdminUserDetailRecord } from "@/mock/AdminUsers";
import MentorDetailsView from "./MentorDetailsView";
import GraduateDetailsView from "./GraduateDetailsView";
import StudentDetailsView from "./StudentDetailsView";

interface UserDetailsViewProps {
  user: AdminUserDetailRecord;
}

const UserDetailsView = ({ user }: UserDetailsViewProps) => {
  const [activeModal, setActiveModal] = useState<"approve" | "reject" | null>(null);

  if (user.role === "Mentor") {
    return (
      <>
        <MentorDetailsView
          user={user}
          onApprove={() => setActiveModal("approve")}
          onReject={() => setActiveModal("reject")}
        />
        <ApproveUserModal
          isOpen={activeModal === "approve"}
          onClose={() => setActiveModal(null)}
          onConfirm={() => setActiveModal(null)}
          userName={user.name}
        />
        <RejectUserModal
          isOpen={activeModal === "reject"}
          onClose={() => setActiveModal(null)}
          onConfirm={() => setActiveModal(null)}
          userName={user.name}
        />
      </>
    );
  }

  if (user.role === "Graduate") {
    return (
      <>
        <GraduateDetailsView
          user={user}
          onApprove={() => setActiveModal("approve")}
          onReject={() => setActiveModal("reject")}
        />
        <ApproveUserModal
          isOpen={activeModal === "approve"}
          onClose={() => setActiveModal(null)}
          onConfirm={() => setActiveModal(null)}
          userName={user.name}
        />
        <RejectUserModal
          isOpen={activeModal === "reject"}
          onClose={() => setActiveModal(null)}
          onConfirm={() => setActiveModal(null)}
          userName={user.name}
        />
      </>
    );
  }

  return (
    <>
      <StudentDetailsView
        user={user}
        onApprove={() => setActiveModal("approve")}
        onReject={() => setActiveModal("reject")}
      />
      <ApproveUserModal
        isOpen={activeModal === "approve"}
        onClose={() => setActiveModal(null)}
        onConfirm={() => setActiveModal(null)}
        userName={user.name}
      />
      <RejectUserModal
        isOpen={activeModal === "reject"}
        onClose={() => setActiveModal(null)}
        onConfirm={() => setActiveModal(null)}
        userName={user.name}
      />
    </>
  );
};

export default UserDetailsView;
