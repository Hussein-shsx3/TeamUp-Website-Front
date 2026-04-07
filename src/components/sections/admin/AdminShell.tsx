"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  Users,
  Lightbulb,
  UsersRound,
  AlertTriangle,
  LogOut,
  X,
} from "lucide-react";
import { Heading } from "@/components/ui/typography";
import { ADMIN_NAV_ITEMS, ADMIN_PROFILE } from "@/mock/AdminDashboard";

interface AdminShellProps {
  children: React.ReactNode;
}

const iconMap = {
  dashboard: LayoutDashboard,
  users: Users,
  ideas: Lightbulb,
  teams: UsersRound,
  reports: AlertTriangle,
  settings: Settings,
  logout: LogOut,
} as const;

const AdminShell = ({ children }: AdminShellProps) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeHref = useMemo(() => {
    if (pathname === "/admin") return "/admin";
    const matched = ADMIN_NAV_ITEMS.filter(({ href }) => href !== "/auth")
      .sort((a, b) => b.href.length - a.href.length)
      .find((item) => pathname.startsWith(item.href));
    return matched?.href ?? "/admin";
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-white text-content">
      <div className="flex min-h-screen">
        <aside
          className="hidden w-[248px] shrink-0 flex-col bg-[#2563EB] px-4 py-5 text-white shadow-[0_14px_40px_rgba(37,99,235,0.24)] lg:flex"
        >
          <Link href="/admin" className="flex items-center justify-center px-3 py-4">
            <div className="relative h-7 w-28">
              <Image
                src="/images/Teamup.svg"
                alt="TeamUp"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </Link>

          <nav className="mt-2 flex flex-1 flex-col gap-1.5 border-t border-white/15 pt-4">
            {ADMIN_NAV_ITEMS.map((item) => {
              const Icon = iconMap[item.icon];
              const isActive = item.href === activeHref;
              const showDivider = item.icon === "settings";
              return (
                <div key={item.href}>
                  {showDivider && <div className="mt-2 mb-3 h-px bg-white/15" />}
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors duration-200 ${
                      isActive
                        ? "bg-white text-primary shadow-[0_4px_14px_rgba(15,23,42,0.12)]"
                        : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon size={18} aria-hidden="true" className="shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </div>
              );
            })}
          </nav>
        </aside>

        {mobileOpen && (
          <div className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden" onClick={() => setMobileOpen(false)} />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-[#2563EB] px-4 py-5 text-white shadow-[0_18px_40px_rgba(37,99,235,0.28)] transition-transform duration-300 lg:hidden ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between pb-4">
            <Link href="/admin" className="relative h-7 w-28">
              <Image
                src="/images/Teamup.svg"
                alt="TeamUp"
                fill
                unoptimized
                className="object-contain"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"
              aria-label="Close navigation"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <nav className="mt-2 flex flex-col gap-1.5 border-t border-white/15 pt-4">
            {ADMIN_NAV_ITEMS.map((item) => {
              const Icon = iconMap[item.icon];
              const isActive = item.href === activeHref;
              const showDivider = item.icon === "settings";
              return (
                <div key={item.href}>
                  {showDivider && <div className="my-1 h-px bg-white/15" />}
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors duration-200 ${
                      isActive
                        ? "bg-white text-primary shadow-[0_4px_14px_rgba(15,23,42,0.12)]"
                        : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon size={18} aria-hidden="true" className="shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </div>
              );
            })}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
            <div className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 lg:hidden"
                aria-label="Open navigation"
              >
                <Menu size={18} aria-hidden="true" />
              </button>

              <div className="relative hidden flex-1 max-w-xl items-center lg:flex">
                <Search
                  size={16}
                  className="absolute left-3.5 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  defaultValue=""
                  placeholder="Search"
                  aria-label="Search admin dashboard"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 font-primary text-sm text-content placeholder:text-slate-400 focus:border-primary focus:outline-none"
                />
              </div>

              <div className="ml-auto flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Notifications"
                  className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-700"
                >
                  <Bell size={18} aria-hidden="true" />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error" />
                </button>

                <div className="flex items-center gap-3 rounded-2xl px-3 py-1.5">
                  <div className="text-right leading-tight">
                    <p className="font-primary text-sm font-semibold text-content">
                      {ADMIN_PROFILE.name}
                    </p>
                    <p className="font-primary text-[11px] text-slate-500">
                      {ADMIN_PROFILE.role}
                    </p>
                  </div>
                  <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white">
                    <Image
                      src={ADMIN_PROFILE.avatar}
                      alt={ADMIN_PROFILE.name}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminShell;
