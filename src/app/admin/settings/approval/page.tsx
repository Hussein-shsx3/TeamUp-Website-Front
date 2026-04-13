import type { Metadata } from "next";
import { AdminSettingsView } from "@/components/sections/admin/settings";

export const metadata: Metadata = {
  title: "TeamUp — Admin Approval Settings",
};

export default function AdminSettingsApprovalPage() {
  return <AdminSettingsView activeTab="approval" />;
}