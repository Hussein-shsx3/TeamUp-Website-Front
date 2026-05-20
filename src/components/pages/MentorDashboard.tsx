"use client";

import { Breadcrumb } from "@/components/ui/navigation";
import { Heading } from "@/components/ui/typography";
import { MentorDashboardView } from "@/components/sections/dashboard/mentor";

interface MentorDashboardProps {
  displayName: string;
  dashboardLabel: string;
  showSuperviseSection?: boolean;
}

const MentorDashboard = ({
  displayName,
  dashboardLabel,
  showSuperviseSection = true,
}: MentorDashboardProps) => {

  return (
    <div>
      <Breadcrumb
        items={[
          { label: dashboardLabel, href: "/dashboard" }
        ]}
      />
      <Heading level="h3" className="mb-6 font-medium text-content-light">
        Welcome, {displayName.split(" ")[0]}!
      </Heading>
      <MentorDashboardView showSuperviseSection={showSuperviseSection} />
    </div>
  );
};

export default MentorDashboard;
