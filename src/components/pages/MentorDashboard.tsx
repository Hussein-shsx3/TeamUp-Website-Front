import { Breadcrumb } from "@/components/ui/navigation";
import { Heading } from "@/components/ui/typography";
import { MentorDashboardView } from "@/components/sections/dashboard/mentor";

const MentorDashboard = () => {
  return (
    <div>
      <Breadcrumb items={[{ label: "Main Mentor Dashboard", href: "/dashboard/mentor" }]} />
      <Heading level="h3" className="mb-6 font-medium text-content-light">
        Welcome , Wafaa !
      </Heading>
      <MentorDashboardView />
    </div>
  );
};

export default MentorDashboard;