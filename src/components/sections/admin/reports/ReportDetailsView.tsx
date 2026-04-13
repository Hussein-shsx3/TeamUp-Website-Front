"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/navigation";
import { Heading } from "@/components/ui/typography";
import { type AdminReportDetailRecord } from "@/mock/AdminReports";
import ReportStatusBadge from "./ReportStatusBadge";

interface ReportDetailsViewProps {
  report: AdminReportDetailRecord;
}

const ReportDetailsView = ({ report }: ReportDetailsViewProps) => {
  return (
    <div className="flex flex-col">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Reports", href: "/admin/reports" },
          { label: "Report Details" },
        ]}
      />

      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Heading
              level="h4"
              className="text-[28px] font-semibold text-content sm:text-[30px]"
            >
              {report.displayTitle}
            </Heading>
            <ReportStatusBadge status={report.status} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="rounded-lg bg-primary px-4 py-2 font-primary text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            Mark as Resolved
          </button>
          <button
            type="button"
            className="rounded-lg border border-primary/30 bg-white px-4 py-2 font-primary text-sm font-medium text-primary transition-colors hover:border-primary/50"
          >
            Mark as In Review
          </button>
        </div>
      </div>

      <section className="rounded-lg border border-slate-200 p-5 sm:p-8 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
        <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)] border p-6 bg-gray-50 rounded-lg">
          <aside className="flex flex-row items-start justify-start gap-3 rounded-lg  p-6 text-center lg:min-h-[224px]">
            <div className="h-16 w-16 overflow-hidden rounded-full shadow-sm">
              <Image
                src={report.reportedByAvatar}
                alt={report.reportedBy}
                width={50}
                height={50}
                unoptimized
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-start items-start">
              <Heading
                level="h6"
                className="text-lg font-semibold text-content"
              >
                {report.reportedBy}
              </Heading>
              <span className="mt-2 inline-flex rounded-full bg-primary/10 px-3 py-1 font-primary text-[11px] font-medium text-primary">
                {report.profileStatus}
              </span>
            </div>
          </aside>

          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200 p-5">
              <Heading
                level="h6"
                className="text-lg font-semibold text-content"
              >
                Report Sending Date
              </Heading>
              <p className="mt-2 font-primary text-sm text-slate-600">
                {report.sendingDateLabel}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 p-5">
              <Heading
                level="h6"
                className="text-lg font-semibold text-content"
              >
                Description
              </Heading>
              <p className="mt-2 max-w-4xl font-primary text-sm leading-relaxed text-slate-600">
                {report.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReportDetailsView;
