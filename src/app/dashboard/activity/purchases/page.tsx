import { Breadcrumb } from "@/components/ui/navigation";
import {
  ActivityShell,
  ActivityToolbar,
} from "@/components/sections/dashboard";
import ActivityPurchasesView from "@/components/sections/dashboard/activity/ActivityPurchasesView";

const ActivityPurchasesPage = () => {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Main Student Dashboard", href: "/dashboard" },
          { label: "My activity" },
        ]}
      />
      <ActivityShell>
        <div className="flex min-h-0 flex-col p-4 sm:p-6 md:p-8">
          <ActivityToolbar />
          <ActivityPurchasesView />
        </div>
      </ActivityShell>
    </div>
  );
};

export default ActivityPurchasesPage;
