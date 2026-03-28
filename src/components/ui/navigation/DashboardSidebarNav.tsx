"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

export interface DashboardSidebarNavItem {
  id: string;
  href: string;
  label: string;
  icon: LucideIcon;
}

export interface DashboardSidebarNavProps {
  items: DashboardSidebarNavItem[];
  /** e.g. "Settings sections" or "Activity sections" */
  "aria-label": string;
  /**
   * Optional nav footer (e.g. delete account on desktop). Omit for routes like My Activity.
   * Parent layouts control mobile vs desktop placement.
   */
  footer?: ReactNode;
  className?: string;
}

const DashboardSidebarNav = ({
  items,
  "aria-label": ariaLabel,
  footer,
  className = "",
}: DashboardSidebarNavProps) => {
  const pathname = usePathname();

  return (
    <aside
      className={`flex min-h-0 shrink-0 flex-col border-b border-gray-100 bg-white p-4 sm:p-5
        md:w-64 md:border-b-0 md:border-r md:lg:w-72 ${className}`.trim()}
    >
      <nav
        aria-label={ariaLabel}
        className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none]
          md:flex-col md:gap-1 md:overflow-visible md:pb-0
          [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 font-primary text-sm
                transition-colors duration-150 md:shrink
                ${
                  isActive
                    ? "bg-primary-light font-semibold text-primary"
                    : "text-content hover:bg-gray-50"
                }`}
            >
              <Icon
                size={18}
                aria-hidden="true"
                className="flex-shrink-0 text-current"
              />
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {footer != null && (
        <div
          className="mt-4 hidden min-h-0 border-t border-gray-100 pt-4 md:mt-auto md:block
            md:pt-5"
        >
          {footer}
        </div>
      )}
    </aside>
  );
};

export default DashboardSidebarNav;
