import Link from "next/link";

export type AdminSettingsTab = "profile" | "system" | "approval" | "notifications";

export interface AdminSettingsTabItem {
  id: AdminSettingsTab;
  label: string;
  href: string;
}

interface AdminSettingsTabsProps {
  activeTab: AdminSettingsTab;
  items: AdminSettingsTabItem[];
}

const AdminSettingsTabs = ({ activeTab, items }: AdminSettingsTabsProps) => {
  return (
    <section className="border-b border-slate-200">
      <div className="grid grid-cols-4 gap-3 text-center font-primary text-sm text-slate-500">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`relative -mb-px pb-3 transition-colors ${
              activeTab === item.id ? "font-medium text-primary" : "hover:text-slate-700"
            }`}
          >
            {item.label}
            <span
              className={`absolute inset-x-0 bottom-0 h-[2px] rounded-full ${
                activeTab === item.id ? "bg-primary" : "bg-transparent"
              }`}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AdminSettingsTabs;