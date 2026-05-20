"use client";

import { LoaderCircle } from "lucide-react";
import { useCurrentUser } from "@/hooks/useUser";
import { getFullName } from "@/lib/user";
import { Heading } from "@/components/ui/typography";
import { Breadcrumb } from "@/components/ui/navigation";
import { MainSection } from "@/components/sections/dashboard";
import MentorDashboard from "./MentorDashboard";
import { getDashboardTitle } from "@/lib/dashboardNavigation";

const Dashboard = () => {

  const { data, isLoading } = useCurrentUser();
  const user = data?.user ?? null;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center rounded-2xl border border-gray-100 bg-white px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <LoaderCircle size={34} className="animate-spin text-primary" />
          <p className="font-primary text-sm text-content-light">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const displayName = getFullName(user?.firstName, user?.lastName) || user?.username || "there";

  if (user?.role === "MENTOR") {
    return (
      <MentorDashboard
        dashboardLabel={getDashboardTitle(user.role)}
        displayName={displayName}
      />
    );
  }

  if (user?.role === "GRADUATE") {
    return (
      <MentorDashboard
        dashboardLabel={getDashboardTitle(user.role)}
        displayName={displayName}
        showSuperviseSection={false}
      />
    );
  }

  return (
    <div>
      <Breadcrumb
        items={[{ label: "Main Student Dashboard", href: "/dashboard" }]}
      />
      <Heading level="h3" className="font-medium mb-6">
        Welcome, {displayName.split(" ")[0]}!
      </Heading>
      <MainSection />
    </div>
  );
};

export default Dashboard;
