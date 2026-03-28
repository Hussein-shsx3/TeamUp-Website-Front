import { Breadcrumb } from "@/components/ui/navigation";
import {
  ActivityShell,
  ActivityToolbar,
  ActivityProjectCard,
} from "@/components/sections/dashboard";
import { MOCK_PURCHASED_ACTIVITY_ITEMS } from "@/mock/Activity";

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
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:gap-6">
            {MOCK_PURCHASED_ACTIVITY_ITEMS.map((item) => (
              <ActivityProjectCard key={item.id} variant="purchased" item={item} />
            ))}
          </div>
        </div>
      </ActivityShell>
    </div>
  );
};

export default ActivityPurchasesPage;
