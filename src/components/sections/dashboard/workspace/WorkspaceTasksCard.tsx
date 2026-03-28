"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import type { MockWorkspaceTask } from "@/mock/TeamWorkspace";
import WorkspaceCard from "./WorkspaceCard";
import DashboardTaskRow from "../shared/DashboardTaskRow";
import { Button, IconButton } from "@/components/ui/buttons";

interface WorkspaceTasksCardProps {
  initialTasks: MockWorkspaceTask[];
  isLead: boolean;
}

const WorkspaceTasksCard = ({ initialTasks, isLead }: WorkspaceTasksCardProps) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [menuId, setMenuId] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setMenuId(null);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const toggle = (id: number) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );

  return (
    <WorkspaceCard
      title="Upcoming Tasks"
      bodyClassName="flex min-h-0 flex-col gap-0"
      className="flex min-h-0 flex-col"
    >
      <div ref={wrapRef} className="mb-4 max-h-64 overflow-y-auto pr-1">
        <ul className="flex flex-col gap-1">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-start gap-1">
              <div className="min-w-0 flex-1">
                <DashboardTaskRow
                  title={task.title}
                  meta={`${task.assignee} · ${task.due}`}
                  done={task.done}
                  onToggle={() => toggle(task.id)}
                />
              </div>
              {isLead ? (
                <div className="relative shrink-0 pt-0.5">
                  <IconButton
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-label={`Task actions`}
                    aria-expanded={menuId === task.id}
                    onClick={() => setMenuId((id) => (id === task.id ? null : task.id))}
                  >
                    <MoreVertical className="text-content-light" />
                  </IconButton>
                  {menuId === task.id ? (
                    <div
                      className="absolute right-0 z-20 mt-1 w-36 rounded-lg border border-gray-100 bg-white py-1 shadow-lg"
                      role="menu"
                    >
                      <button
                        type="button"
                        className="flex w-full items-center gap-2 px-3 py-2 font-primary text-xs text-content hover:bg-gray-50"
                        role="menuitem"
                        onClick={() => {
                          setMenuId(null);
                          console.log("edit task (mock)", task.id);
                        }}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </button>
                      <button
                        type="button"
                        className="flex w-full items-center gap-2 px-3 py-2 font-primary text-xs text-error hover:bg-error/5"
                        role="menuitem"
                        onClick={() => {
                          setMenuId(null);
                          console.log("delete task (mock)", task.id);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
      <Button
        type="button"
        variant="primary"
        size="md"
        disabled={!isLead}
        className={`mt-auto w-full ${
          !isLead ? "bg-gray-100 text-content-muted hover:bg-gray-100" : ""
        }`}
        onClick={() => console.log("add task (mock)")}
      >
        Add New Task
      </Button>
    </WorkspaceCard>
  );
};

export default WorkspaceTasksCard;
