"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ProjectCard } from "@/components/ui/cards";
import { projectService } from "@/services/project.service";

const ActivitySavedView = () => {
  const router = useRouter();

  const savedQuery = useQuery({
    queryKey: ["projects", "activity", "saved"],
    queryFn: () => projectService.getSavedProjects(),
  });

  if (savedQuery.isLoading) {
    return <p className="mt-6 font-primary text-sm text-content-light">Loading saved projects...</p>;
  }

  if (savedQuery.isError) {
    return (
      <p className="mt-6 font-primary text-sm text-error">
        Failed to load saved projects from the server.
      </p>
    );
  }

  if (savedQuery.data?.projects.length === 0) {
    return (
      <p className="mt-6 font-primary text-sm text-content-light">
        No saved projects yet.
      </p>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:gap-6">
      {savedQuery.data?.projects.map((project) => (
        <ProjectCard
          key={project.id}
          variant="saved"
          id={project.id}
          title={project.title}
          description={project.summary || project.description || ""}
          price={project.ideaType === "PAID" ? "paid" : "free"}
          priceAmount={project.ideaType === "PAID" ? project.price : undefined}
          postedBy={
            [project.creator.firstName, project.creator.lastName].filter(Boolean).join(" ") ||
            project.creator.username
          }
          mentorAvatar={project.creator.profilePictureUrl ?? "/images/user.png"}
          statusLabel="Saved"
          onAction={() => router.push(`/dashboard/projects-ideas/${project.id}`)}
        />
      ))}
    </div>
  );
};

export default ActivitySavedView;