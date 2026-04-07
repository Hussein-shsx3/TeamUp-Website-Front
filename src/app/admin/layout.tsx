import type { Metadata } from "next";
import { AdminShell } from "@/components/sections/admin";

export const metadata: Metadata = {
  title: "TeamUp — Admin Dashboard",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminShell>{children}</AdminShell>;
}
