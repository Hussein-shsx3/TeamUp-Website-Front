import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getUserById, MOCK_MENTOR_SUPERVISED_PROJECTS } from "@/mock/Dashboard";
import { ProfileSection } from "@/components/sections/dashboard";
import { Breadcrumb } from "@/components/ui/navigation";
import { MoveLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "TeamUp — User Profile",
};

type Props = { params: Promise<{ id: string }> };

const UserProfileRoute = async ({ params }: Props) => {
  const { id } = await params;
  const user = getUserById(Number(id));

  if (!user) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center p-6 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="font-primary text-3xl font-bold text-content sm:text-4xl">User not found</h1>
        <p className="mt-4 max-w-md font-primary text-lg text-content-light">
          We couldn&apos;t find a user with ID: <span className="font-semibold text-content">{id}</span>
        </p>
        <div className="mt-10">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-primary text-lg font-medium text-primary transition-all hover:gap-3 hover:text-primary-dark"
          >
            <MoveLeft className="h-5 w-5" />
            Go back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const isMentor = user.displayRole?.toLowerCase() === "mentor";
  const activeCount = isMentor ? MOCK_MENTOR_SUPERVISED_PROJECTS.filter((p) => p.status !== "Completed").length : undefined;
  const completedCount = isMentor ? MOCK_MENTOR_SUPERVISED_PROJECTS.filter((p) => p.status === "Completed").length : undefined;

  return (
    <div>
      <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: isMentor ? "Mentor Profile" : "Student Profile" }]} />
      <ProfileSection
        name={user.name}
        displayRole={user.displayRole}
        avatar={user.avatar}
        skills={user.skills}
        university={user.university}
        major={user.major}
        bio={user.bio}
        isOwnProfile={false}
        nonOwnActionLabel={isMentor ? "Request Supervision" : "Invitation"}
        activeProjectsCount={activeCount}
        completedProjectsCount={completedCount}
      />
    </div>
  );
};

export default UserProfileRoute;
