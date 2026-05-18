"use client";

import Image from "next/image";
import { Heading } from "@/components/ui/typography";
import { LinkButton } from "@/components/ui/buttons";
import { useRecommendedProjects } from "@/hooks/useProject";

const RecommendedProjects = () => {
  const { recommendedProjects, recommendedProjectsQuery } = useRecommendedProjects();

  return (
    <div className="flex flex-col gap-4">
      <Heading level="h6" className="font-semibold text-content">
        Recommended for You
      </Heading>

      {recommendedProjectsQuery.isLoading ? (
        <p className="font-primary text-sm text-content-light">Loading projects...</p>
      ) : recommendedProjects.length === 0 ? (
        <p className="font-primary text-sm text-content-light">No recommended projects yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {recommendedProjects.map((project) => (
            <li
              key={project.id}
              className="bg-white rounded-2xl border border-gray-100
                shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:gap-0">
                <div
                  className="relative w-full shrink-0 aspect-[16/9] max-h-[min(220px,45vh)] sm:aspect-auto
                    sm:w-40 sm:min-w-[10rem] md:w-44 md:min-w-[11rem] sm:max-h-none sm:min-h-[168px] sm:self-stretch"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 176px"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col gap-2 px-4 pb-5 pt-4 sm:pl-4 sm:pr-8 sm:py-5">
                  <p className="font-primary text-sm font-semibold text-content leading-snug">
                    {project.title}
                  </p>
                  <p
                    className="font-primary text-xs text-content-light leading-relaxed
                    line-clamp-2 sm:line-clamp-3"
                  >
                    {project.description}
                  </p>

                  <div className="flex items-center gap-1.5 flex-wrap mb-1 sm:mb-3">
                    <span className="font-primary text-[11px] text-accent shrink-0">
                      Looking for
                    </span>
                    {project.tags.length > 0 ? (
                      project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-primary-light
                            font-primary text-[11px] text-primary font-medium"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="font-primary text-[11px] text-content-light">
                        No skills listed yet.
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 mt-auto">
                    <LinkButton
                      variant="primary"
                      size="sm"
                      className="w-full sm:flex-1 py-3"
                      href={`/dashboard/find-team/${project.id}`}
                    >
                      Request to join
                    </LinkButton>
                    <LinkButton
                      variant="secondary"
                      size="sm"
                      className="w-full sm:flex-1 py-3"
                      href={`/dashboard/find-team/${project.id}`}
                    >
                      View Details
                    </LinkButton>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecommendedProjects;
