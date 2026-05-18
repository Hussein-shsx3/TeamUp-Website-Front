"use client";

import { Breadcrumb } from "@/components/ui/navigation";
import { EditProfileForm } from "@/components/sections/dashboard";
import { useCurrentUser } from "@/hooks/useUser";
import { getAvatarSrc, getDisplayRole, getFullName } from "@/lib/user";

const EditProfilePage = () => {
  const { data: currentUser } = useCurrentUser();
  const displayUser = currentUser?.user ?? null;
  const academicProfile = displayUser?.academicProfile ?? null;
  const displayRole = displayUser ? getDisplayRole(displayUser.role) : "User";
  const isMentor = displayRole === "Mentor";
  const displayName = displayUser
    ? getFullName(displayUser.firstName, displayUser.lastName) || displayUser.username
    : "Edit Profile";

  const bio = displayUser?.bio ?? "";

  return (
    <div>
      <Breadcrumb
        items={[
          {
            label: isMentor ? "Main Mentor Dashboard" : "Main Student Dashboard",
            href: "/dashboard",
          },
          { label: isMentor ? "Mentor Profile" : "Student Profile" },
        ]}
      />
      <div
        className="overflow-hidden rounded-xl border border-gray-100 bg-white
          shadow-[0_2px_16px_rgba(0,0,0,0.06)] sm:rounded-2xl"
      >
        <div className="p-4 sm:p-6 md:p-8">
          <EditProfileForm
            initialName={displayName}
            initialRole={displayRole}
            initialUniversityId={displayUser?.universityId ?? ""}
            initialCollegeId={displayUser?.collegeId ?? ""}
            initialDepartmentId={displayUser?.departmentId ?? ""}
            initialMajor={academicProfile?.major ?? ""}
            initialSkills={academicProfile?.skills ?? []}
            initialBio={bio}
            initialAvatar={getAvatarSrc(displayUser?.profilePictureUrl)}
            actionsAlign="start"
            cancelHref="/dashboard/profile"
            isMentor={isMentor}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
