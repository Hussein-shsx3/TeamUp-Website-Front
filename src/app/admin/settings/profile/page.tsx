import type { Metadata } from "next";
import { AdminSettingsView } from "@/components/sections/admin/settings";

export const metadata: Metadata = {
  title: "TeamUp — Admin Profile Settings",
};

export default function AdminSettingsProfilePage() {
  return <AdminSettingsView activeTab="profile" />;
}