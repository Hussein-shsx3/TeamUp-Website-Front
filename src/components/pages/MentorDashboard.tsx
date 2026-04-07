import { Breadcrumb } from "@/components/ui/navigation";
import { Heading } from "@/components/ui/typography";
import { MentorDashboardView } from "@/components/sections/dashboard/mentor";
import { MOCK_USER } from "@/mock/Dashboard";

interface MentorDashboardProps {
  showSuperviseSection?: boolean;
}

const MentorDashboard = ({ showSuperviseSection = true }: MentorDashboardProps) => {
  const dashboardLabel =
    MOCK_USER.userRole === "graduate"
      ? "Main Graduate Dashboard"
      : "Main Mentor Dashboard";

  return (
    <div>
      <Breadcrumb
        items={[
          { label: dashboardLabel, href: "/dashboard" }
        ]}
      />
      <Heading level="h3" className="mb-6 font-medium text-content-light">
        Welcome, {MOCK_USER.name.split(" ")[0]}!
      </Heading>
      <MentorDashboardView showSuperviseSection={showSuperviseSection} />
    </div>
  );
};

export default MentorDashboard;
