"use client";

import { Breadcrumb } from "@/components/ui/navigation";
import { ProfileSection } from "@/components/sections/dashboard";
import { useCurrentUser } from "@/hooks/useUser";
import { useUniversityName } from "@/hooks/useInstitution";
import { getAvatarSrc, getDisplayRole, getFullName } from "@/lib/user";

const StudentProfilePage = () => {
  const { data: currentUser } = useCurrentUser();
  const displayUser = currentUser?.user ?? null;
  const academicProfile = displayUser?.academicProfile ?? null;
  const universityLookup = useUniversityName(displayUser?.universityId ?? null);
  const displayRole = displayUser ? getDisplayRole(displayUser.role) : "User";
  const displayName = displayUser
    ? getFullName(displayUser.firstName, displayUser.lastName) || displayUser.username
    : "Student Profile";
  const bio = displayUser?.bio ?? "";
  const skills = academicProfile?.skills ?? [];
  const university = universityLookup.isLoading && displayUser?.universityId ? "Loading..." : universityLookup.universityName;
  const major = academicProfile?.major ?? "";

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Main Student Dashboard", href: "/dashboard" },
          { label: "Student Profile" },
        ]}
      />
      <ProfileSection
        name={displayName}
        displayRole={displayRole}
        avatar={getAvatarSrc(displayUser?.profilePictureUrl)}
        skills={skills}
        university={university}
        major={major}
        bio={bio}
        isOwnProfile
      />
    </div>
  );
};

export default StudentProfilePage;
