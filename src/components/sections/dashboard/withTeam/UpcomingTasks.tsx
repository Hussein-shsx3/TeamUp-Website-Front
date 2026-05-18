"use client";

import { useEffect, useState } from "react";
import { MOCK_USER } from "@/mock/Dashboard";
import { Heading } from "@/components/ui/typography";
import { Button, LinkButton } from "@/components/ui/buttons";
import DashboardTaskRow from "../shared/DashboardTaskRow";
import { useWorkspaceTasks } from "@/hooks/useTeam";

const CAN_MANAGE = ["team_admin", "mentor"] as const;

const UpcomingTasks = () => {
  const { workspaceTasks, workspaceTasksQuery } = useWorkspaceTasks();
  const [tasks, setTasks] = useState(workspaceTasks);

  const canManage = CAN_MANAGE.includes(
    MOCK_USER.userRole as (typeof CAN_MANAGE)[number],
  );

  useEffect(() => {
    if (tasks.length === 0 && workspaceTasks.length > 0) {
      setTasks(workspaceTasks);
    }
  }, [tasks.length, workspaceTasks]);

  const toggle = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100
      shadow-[0_2px_16px_rgba(0,0,0,0.06)] p-5 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <Heading level="h6" className="font-semibold text-content">
          Upcoming Tasks
        </Heading>
        <LinkButton
          href="/dashboard/tasks"
          variant="ghost"
          size="sm"
          className="font-primary text-xs text-primary hover:underline"
        >
          View All
        </LinkButton>
      </div>

      {/* Task list */}
      <ul className="my-3 flex flex-col gap-3">
        {tasks.map((task) => (
          <li key={task.id}>
            <DashboardTaskRow
              title={task.title}
              meta={task.due}
              done={task.done}
              onToggle={() => toggle(task.id)}
            />
          </li>
        ))}
      </ul>

      {/* Add New Task — primary if team_admin/mentor, gray+disabled otherwise */}
      <Button
        variant="primary"
        size="md"
        disabled={!canManage}
        className={`w-full mt-auto ${
          !canManage
            ? "bg-gray-100 text-content-muted hover:bg-gray-100"
            : ""
        }`}
        onClick={() => {
          /* TODO: open add task modal */
          console.log("add task");
        }}
      >
        Add New Task
      </Button>
    </div>
  );
};

export default UpcomingTasks;
