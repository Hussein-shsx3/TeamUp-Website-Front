import { MOCK_ACTIVITIES } from "@/mock/Dashboard";
import { Heading } from "@/components/ui/typography";
import { ClipboardList } from "lucide-react";

const RecentActivity = () => {
  return (
    <div
      className="bg-white rounded-lg border border-gray-100
      shadow-[0_2px_16px_rgba(0,0,0,0.06)] p-5 flex flex-col gap-4"
    >
      <Heading level="h6" className="font-semibold text-content">
        Recent Activity
      </Heading>

      <ul className="flex flex-col gap-3">
        {MOCK_ACTIVITIES.map((activity) => (
          <li key={activity.id} className="flex items-center gap-3">
            {/* icon badge */}
            <div
              className="w-9 h-9 rounded-full bg-primary/10 flex items-center
              justify-center flex-shrink-0"
            >
              <ClipboardList
                size={15}
                className="text-primary"
                aria-hidden="true"
              />
            </div>

            {/* text */}
            <div className="flex-1 min-w-0">
              <p className="font-primary text-xs font-medium text-content leading-snug truncate">
                {activity.actor}{" "}
                <span className="font-normal text-content-light">
                  {activity.action}
                </span>
              </p>
              <p className="font-primary text-[11px] text-content-muted mt-0.5">
                {activity.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
