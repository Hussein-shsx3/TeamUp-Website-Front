import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReportDetailsView } from "@/components/sections/admin/reports";
import { getAdminReportById } from "@/mock/AdminReports";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((id) => ({ id: String(id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const report = getAdminReportById(Number(id));

  return {
    title: report ? `TeamUp — ${report.displayTitle}` : "TeamUp — Report Details",
  };
}

export default async function AdminReportDetailsPage({ params }: Props) {
  const { id } = await params;
  const report = getAdminReportById(Number(id));

  if (!report) return notFound();

  return <ReportDetailsView report={report} />;
}