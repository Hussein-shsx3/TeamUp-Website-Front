import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Heading } from "@/components/ui/typography";
import { ADMIN_NAV_ITEMS } from "@/mock/AdminDashboard";

interface Props {
  params: Promise<{ section: string }>;
}

const allowedSections = new Set(
  ADMIN_NAV_ITEMS.filter((item) => item.href.startsWith("/admin/"))
    .filter((item) => item.href !== "/admin/users")
    .filter((item) => item.href !== "/admin/project-ideas")
    .map((item) => item.href.replace("/admin/", ""))
    .filter((value) => value.length > 0),
);

export async function generateStaticParams() {
  return [...allowedSections].map((section) => ({ section }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  return {
    title: `TeamUp — Admin ${section.replace(/-/g, " ")}`,
  };
}

export default async function AdminSectionPage({ params }: Props) {
  const { section } = await params;
  if (!allowedSections.has(section)) return notFound();

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.04)] sm:p-8">
        <Heading level="h4" className="font-semibold text-content">
          {section.replace(/-/g, " ")}
        </Heading>
        <p className="mt-3 max-w-xl font-primary text-sm leading-relaxed text-slate-500">
          This admin section is scaffolded with mock data and the same design system.
          It is ready to be connected to backend data and section-specific tables, forms, or moderation flows.
        </p>
      </div>
    </div>
  );
}
