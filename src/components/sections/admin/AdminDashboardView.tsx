"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import Image from "next/image";
import {
  Eye,
  Filter,
  MoreVertical,
  Search,
  Users,
  AlertTriangle,
  FolderOpen,
  CheckCircle,
  Lightbulb,
  UsersRound,
  Settings2,
} from "lucide-react";
import { Button, LinkButton } from "@/components/ui/buttons";
import { Heading } from "@/components/ui/typography";
import {
  ADMIN_GROWTH_MONTHLY,
  ADMIN_GROWTH_YEARLY,
  ADMIN_QUICK_ACTIONS,
  ADMIN_RECENT_IDEAS,
  ADMIN_STATS,
  ADMIN_STATUS_BREAKDOWN,
} from "@/mock/AdminDashboard";

// ─── Chart.js dynamic import (avoids SSR issues) ────────────────────────────
let Chart: any = null;

const toneClasses = {
  primary: "bg-primary",
  warning: "bg-warning",
  info: "bg-info",
  success: "bg-success",
  danger: "bg-error",
} as const;

const iconMap = {
  users: Users,
  "pending-users": AlertTriangle,
  projects: FolderOpen,
  completed: CheckCircle,
  ideas: Lightbulb,
} as const;

// ─── Platform Growth Line Chart ──────────────────────────────────────────────
const PlatformGrowthChart = ({ range }: { range: "Year" | "Month" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const ChartJS = (await import("chart.js/auto")).default;
      if (cancelled || !canvasRef.current) return;
      Chart = ChartJS;

      // Destroy previous instance
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = canvasRef.current.getContext("2d")!;
      const isCompact = canvasRef.current.clientWidth < 480;

      // Select data based on range
      const data = range === "Year" ? ADMIN_GROWTH_YEARLY : ADMIN_GROWTH_MONTHLY;
      const mobileMonthTickLimit = range === "Month" ? 6 : 12;
      const mobileYearTickLimit = range === "Year" ? 5 : 12;

      // Gradient fills
      const usersGrad = ctx.createLinearGradient(0, 0, 0, 240);
      usersGrad.addColorStop(0, "rgba(59,130,246,0.22)");
      usersGrad.addColorStop(1, "rgba(59,130,246,0.02)");

      const projectsGrad = ctx.createLinearGradient(0, 0, 0, 240);
      projectsGrad.addColorStop(0, "rgba(16,185,129,0.18)");
      projectsGrad.addColorStop(1, "rgba(16,185,129,0.02)");

      const labels = data.map((p) => p.label);
      const usersData = data.map((p) => p.users);
      const projectsData = data.map((p) => p.projects);

      // Plugin: hover column + tooltip bubble above active point
      const highlightPlugin = {
        id: "highlightColumn",
        afterDraw(chart: any) {
          const ctx = chart.ctx;
          const activeElements = chart.tooltip?.getActiveElements?.() ?? [];
          if (!activeElements.length) return;

          const activePoint = activeElements[0].element;
          const activeIndex = activeElements[0].index;
          if (!activePoint) return;

          const { x, y } = activePoint.getProps(["x", "y"], true);
          const { top, bottom } = chart.chartArea;

          ctx.save();
          ctx.fillStyle = "rgba(219,234,254,0.45)";
          const w = 24;
          ctx.beginPath();
          // @ts-ignore
          ctx.roundRect(x - w / 2, top, w, bottom - top, 12);
          ctx.fill();

          ctx.fillStyle = "#111827";
          ctx.beginPath();
          // @ts-ignore
          ctx.roundRect(x - 14, y - 40, 28, 22, 10);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(x - 5, y - 18);
          ctx.lineTo(x + 5, y - 18);
          ctx.lineTo(x, y - 10);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#fff";
          ctx.font = "600 12px -apple-system, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(String(usersData[activeIndex]), x, y - 29);
          ctx.restore();
        },
      };

      chartRef.current = new ChartJS(ctx, {
        type: "line",
        plugins: [highlightPlugin],
        data: {
          labels,
          datasets: [
            {
              label: "Users",
              data: usersData,
              borderColor: "#3B82F6",
              borderWidth: 3,
              backgroundColor: usersGrad,
              fill: true,
              tension: 0.45,
              pointRadius: 0,
              pointHoverRadius: 0,
              pointBorderWidth: 0,
              pointBackgroundColor: "transparent",
            },
            {
              label: "Projects",
              data: projectsData,
              borderColor: "#10B981",
              borderWidth: 2.5,
              backgroundColor: projectsGrad,
              fill: true,
              tension: 0.45,
              pointRadius: 0,
              pointHoverRadius: 0,
              pointBorderWidth: 0,
              pointBackgroundColor: "transparent",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          interaction: {
            mode: "index",
            intersect: false,
          },
          onHover: (event: any, activeElements: any, chart: any) => {
            chart.canvas.style.cursor = activeElements.length
              ? "pointer"
              : "default";
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: false,
              mode: "index",
              intersect: false,
              external: () => undefined,
            },
          },
          layout: {
            padding: {
              top: isCompact ? 2 : 8,
              right: isCompact ? 0 : 4,
              bottom: isCompact ? 0 : 2,
              left: 0,
            },
          },
          scales: {
            x: {
              grid: { display: false },
              border: { display: false },
              ticks: {
                font: { size: isCompact ? 8 : 10 },
                color: "#9ca3af",
                maxRotation: 0,
                autoSkip: isCompact,
                maxTicksLimit: isCompact
                  ? Math.min(mobileMonthTickLimit, mobileYearTickLimit)
                  : 12,
              },
            },
            y: {
              min: 0,
              ticks: {
                stepSize: 2,
                font: { size: isCompact ? 8 : 10 },
                color: "#9ca3af",
              },
              grid: {
                color: "#E2E8F0",
                lineWidth: 0.8,
              },
              border: { display: false, dash: [2, 4] },
            },
          },
        },
      } as any);
    };

    init();
    return () => {
      cancelled = true;
      chartRef.current?.destroy();
    };
  }, [range]);

  return (
    <div className="w-full overflow-x-auto overscroll-x-contain">
      <div
        className={`relative h-[200px] sm:h-[250px] ${
          range === "Month" ? "min-w-[860px] sm:min-w-0" : "min-w-[620px] sm:min-w-0"
        }`}
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

// ─── Project Status Donut Chart ──────────────────────────────────────────────
const ProjectStatusDonut = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);

  const slices = ADMIN_STATUS_BREAKDOWN; // [{ label, color, value }]

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const ChartJS = (await import("chart.js/auto")).default;
      if (cancelled || !canvasRef.current) return;

      if (chartRef.current) chartRef.current.destroy();

      const ctx = canvasRef.current.getContext("2d")!;
      const values = slices.map(
        (s) => s.value ?? [40, 25, 35][slices.indexOf(s)],
      );
      const labels = slices.map((s) => s.label);
      const labelTexts = values.map((v) => `${v}%`);

      // Plugin: white percentage labels inside slices
      const sliceLabelPlugin = {
        id: "sliceLabels",
        afterDraw(chart: any) {
          const ctx = chart.ctx;
          const meta = chart.getDatasetMeta(0);
          meta.data.forEach((arc: any, i: number) => {
            const props = arc.getProps(
              ["startAngle", "endAngle", "outerRadius", "innerRadius"],
              true,
            );
            const mid = (props.startAngle + props.endAngle) / 2;
            const r = (props.outerRadius + props.innerRadius) / 2;
            const x = arc.x + r * Math.cos(mid);
            const y = arc.y + r * Math.sin(mid);
            ctx.save();
            ctx.fillStyle = "#fff";
            ctx.font = "600 12px -apple-system, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(labelTexts[i], x, y);
            ctx.restore();
          });
        },
      };

      chartRef.current = new ChartJS(ctx, {
        type: "doughnut",
        plugins: [sliceLabelPlugin],
        data: {
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: slices.map((s) => s.color),
              borderWidth: 3,
              borderColor: "#fff",
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: false,
          cutout: "66%",
          animation: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx: any) => ` ${ctx.label}: ${ctx.parsed}%`,
              },
            },
          },
        },
      });
    };

    init();
    return () => {
      cancelled = true;
      chartRef.current?.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Donut + center label */}
      <div className="relative flex h-56 w-56 items-center justify-center">
        <canvas ref={canvasRef} width={224} height={224} />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-primary text-xs text-slate-500">Total</p>
          <p className="font-primary text-sm font-semibold text-content">
            100%
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
        {slices.map((slice) => (
          <span key={slice.label} className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: slice.color }}
            />
            {slice.label}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Main Dashboard View ─────────────────────────────────────────────────────
const AdminDashboardView = () => {
  const [ideaQuery, setIdeaQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Pending" | "Approved" | "Rejected"
  >("All");
  const [chartRange, setChartRange] = useState<"Year" | "Month">("Year");

  const filteredIdeas = useMemo(() => {
    return ADMIN_RECENT_IDEAS.filter((idea) => {
      const matchesQuery =
        idea.title.toLowerCase().includes(ideaQuery.toLowerCase()) ||
        idea.submittedBy.toLowerCase().includes(ideaQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || idea.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [ideaQuery, statusFilter]);

  const selectedCount = ADMIN_RECENT_IDEAS.filter(
    (idea) => idea.selected,
  ).length;

  return (
    <div className="flex flex-col gap-5">
      {/* ── Stats row ── */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {ADMIN_STATS.map((stat) => {
          const Icon = iconMap[stat.icon];
          return (
            <article
              key={stat.label}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-gray-50 px-4 py-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)]"
            >
              <div>
                <p className="font-primary text-xs text-primary">
                  {stat.label}
                </p>
                <p className="mt-1 font-primary text-xl font-semibold tracking-tight text-content">
                  {stat.value}
                </p>
              </div>
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${toneClasses[stat.tone]}`}
              >
                <Icon size={18} aria-hidden="true" />
              </div>
            </article>
          );
        })}
      </section>

      {/* ── Charts row ── */}
      <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)]">
        {/* Platform Growth */}
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)] sm:p-5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div>
              <Heading
                level="h5"
                className="text-lg font-semibold text-content sm:text-xl"
              >
                Platform Growth
              </Heading>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 sm:gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-primary" /> Users
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-accent" /> Projects
                </span>
              </div>
            </div>
            <select
              className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 font-primary text-xs text-slate-600 sm:w-auto"
              value={chartRange}
              onChange={(e) =>
                setChartRange(e.target.value as "Year" | "Month")
              }
              aria-label="Chart range"
            >
              <option>Year</option>
              <option>Month</option>
            </select>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-100 bg-[#FBFCFE] px-2 pb-2 pt-2 sm:px-3 sm:pb-3 sm:pt-4">
            <PlatformGrowthChart range={chartRange} />
          </div>
        </article>

        {/* Project Status Distribution */}
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)] sm:p-5">
          <Heading
            level="h5"
            className="text-center text-lg font-semibold text-content-light sm:text-xl"
          >
            Project Status Distribution
          </Heading>
          <div className="mt-6 flex flex-col items-center justify-center gap-4">
            <ProjectStatusDonut />
          </div>
        </article>
      </section>

      {/* ── Table + Quick Actions row ── */}
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* Recent Project Ideas */}
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)] sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Heading
              level="h5"
              className="text-lg font-semibold text-content sm:text-xl"
            >
              Recent Project Ideas
            </Heading>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 sm:w-auto">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={ideaQuery}
                  onChange={(e) => setIdeaQuery(e.target.value)}
                  placeholder="Search"
                  aria-label="Search project ideas"
                  className="h-10 w-full border-0 bg-transparent pl-9 pr-3 font-primary text-sm text-content placeholder:text-slate-400 focus:outline-none focus:ring-0 sm:w-52"
                />
              </div>

              <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 sm:w-auto">
                <Filter
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as typeof statusFilter)
                  }
                  aria-label="Filter project ideas"
                  className="h-10 w-full border-0 bg-transparent pl-9 pr-10 font-primary text-sm text-content focus:outline-none focus:ring-0 sm:w-28"
                >
                  <option>All</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left font-primary text-[11px] uppercase tracking-wide text-slate-400">
                  <th className="w-10 px-2 py-2"> </th>
                  <th className="px-2 py-2">Idea Title</th>
                  <th className="px-2 py-2">Submitted By</th>
                  <th className="px-2 py-2">Status</th>
                  <th className="px-2 py-2">Date</th>
                  <th className="px-2 py-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredIdeas.map((idea) => (
                  <tr
                    key={idea.id}
                    className="rounded-xl bg-white text-sm text-content"
                  >
                    <td className="rounded-l-xl border border-slate-200 border-r-0 px-2 py-3">
                      <input
                        type="checkbox"
                        checked={idea.selected}
                        readOnly
                        className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                      />
                    </td>
                    <td className="border-y border-slate-200 px-2 py-3 font-primary text-sm text-slate-700">
                      {idea.title}
                    </td>
                    <td className="border-y border-slate-200 px-2 py-3">
                      <div className="flex items-center gap-2">
                        <div className="relative h-7 w-7 overflow-hidden rounded-full ring-2 ring-white">
                          <Image
                            src="/images/user.jpg"
                            alt={idea.submittedBy}
                            fill
                            unoptimized
                            className="object-cover"
                            sizes="28px"
                          />
                        </div>
                        <div>
                          <div className="font-primary text-sm text-slate-700">
                            {idea.submittedBy}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="border-y border-slate-200 px-2 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 font-primary text-[11px] font-semibold ${
                          idea.status === "Approved"
                            ? "bg-success/10 text-success"
                            : idea.status === "Rejected"
                              ? "bg-error/10 text-error"
                              : "bg-warning/10 text-warning"
                        }`}
                      >
                        {idea.status}
                      </span>
                    </td>
                    <td className="border-y border-slate-200 px-2 py-3 font-primary text-xs text-slate-500">
                      {idea.date}
                    </td>
                    <td className="rounded-r-xl border border-slate-200 border-l-0 px-2 py-3">
                      <div className="flex items-center justify-end gap-1 text-slate-500">
                        <button
                          type="button"
                          aria-label={`View ${idea.title}`}
                          className="rounded-lg p-2 hover:bg-slate-100"
                        >
                          <Eye size={16} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          aria-label={`More actions for ${idea.title}`}
                          className="rounded-lg p-2 hover:bg-slate-100"
                        >
                          <MoreVertical size={16} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span>Show result:</span>
              <select
                className="h-8 rounded-lg border border-slate-200 bg-white pl-2 pr-8 text-xs text-slate-600 focus:outline-none focus:ring-0"
                defaultValue="5"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="rounded-lg px-3 py-2 hover:bg-slate-100"
              >
                ‹
              </button>
              <button
                type="button"
                className="rounded-lg px-3 py-2 hover:bg-slate-100"
              >
                1
              </button>
              <button
                type="button"
                className="rounded-lg bg-primary px-3 py-2 text-white"
              >
                2
              </button>
              <button
                type="button"
                className="rounded-lg px-3 py-2 hover:bg-slate-100"
              >
                3
              </button>
              <button
                type="button"
                className="rounded-lg px-3 py-2 hover:bg-slate-100"
              >
                ›
              </button>
            </div>
          </div>
        </article>

        {/* Quick Actions */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
          <Heading level="h5" className="font-semibold text-content-light">
            Quick Actions
          </Heading>
          <div className="mt-4 flex flex-col gap-3">
            {ADMIN_QUICK_ACTIONS.map((action, index) => {
              const iconNames = [Users, UsersRound, Lightbulb, Settings2] as const;
              const Icon = iconNames[index] ?? Settings2;
              const active = index === 0;

              return (
                <LinkButton
                  key={action.label}
                  href={action.href}
                  variant="secondary"
                  size="md"
                  className={`h-16 !justify-start rounded-xl border px-4 text-left ${
                    active ? "border-primary" : "border-slate-100"
                  }`}
                >
                  <span className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="font-primary text-sm font-medium">
                    {action.label}
                  </span>
                </LinkButton>
              );
            })}
          </div>
        </aside>
      </section>
    </div>
  );
};

export default AdminDashboardView;
