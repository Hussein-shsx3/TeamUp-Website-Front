import { MOCK_USER } from "@/mock/Dashboard";
import { Heading } from "@/components/ui/typography";
import { Breadcrumb } from "@/components/ui/navigation";
import { MainSection } from "@/components/sections/dashboard";
import MentorDashboard from "./MentorDashboard";

const Dashboard = () => {
  if (MOCK_USER.userRole === "mentor") {
    return <MentorDashboard />;
  }

  if (MOCK_USER.userRole === "graduate") {
    return <MentorDashboard showSuperviseSection={false} />;
  }

  return (
    <div>
      <Breadcrumb
        items={[{ label: "Main Student Dashboard", href: "/dashboard" }]}
      />
      <Heading level="h3" className="font-medium mb-6">
        Welcome , {MOCK_USER.name.split(" ")[0]} !
      </Heading>
      <MainSection />
    </div>
  );
};

export default Dashboard;
