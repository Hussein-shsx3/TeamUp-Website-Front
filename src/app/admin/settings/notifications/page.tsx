import type { Metadata } from "next";
import { AdminSettingsView } from "@/components/sections/admin/settings";

export const metadata: Metadata = {
  title: "TeamUp — Admin Notification Settings",
};

export default function AdminSettingsNotificationsPage() {
  return <AdminSettingsView activeTab="notifications" />;
}