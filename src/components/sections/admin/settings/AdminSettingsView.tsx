"use client";

import { Breadcrumb } from "@/components/ui/navigation";
import { Heading } from "@/components/ui/typography";
import AdminSettingsTabs, { type AdminSettingsTab } from "./AdminSettingsTabs";
import ProfileSettingsSection from "./ProfileSettingsSection";
import SystemSettingsSection from "./SystemSettingsSection";
import ApprovalSettingsSection from "./ApprovalSettingsSection";
import NotificationsSettingsSection from "./NotificationsSettingsSection";

const tabItems: Array<{ id: AdminSettingsTab; label: string; href: string }> = [
  { id: "profile", label: "Profile Settings", href: "/admin/settings/profile" },
  { id: "system", label: "System Settings", href: "/admin/settings/system" },
  { id: "approval", label: "User & Approval Settings", href: "/admin/settings/approval" },
  { id: "notifications", label: "Notifications Settings", href: "/admin/settings/notifications" },
];

interface AdminSettingsViewProps {
  activeTab: AdminSettingsTab;
}

const AdminSettingsView = ({ activeTab }: AdminSettingsViewProps) => {
  return (
    <div className="flex flex-col">
      <Breadcrumb items={[{ label: "Dashboard", href: "/admin" }, { label: "Settings" }]} />

      <section className="mb-8 space-y-1">
        <Heading level="h4" className="text-[28px] font-semibold text-content sm:text-[30px]">
          Admin Settings
        </Heading>
        <p className="max-w-2xl font-primary text-sm text-slate-500 sm:text-base">
          Configure system and account preferences
        </p>
      </section>

      <AdminSettingsTabs activeTab={activeTab} items={tabItems} />

      {activeTab === "profile" && <ProfileSettingsSection />}
      {activeTab === "system" && <SystemSettingsSection />}
      {activeTab === "approval" && <ApprovalSettingsSection />}
      {activeTab === "notifications" && <NotificationsSettingsSection />}
    </div>
  );
};

export default AdminSettingsView;
