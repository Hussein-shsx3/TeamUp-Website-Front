import Image from "next/image";
import { MOCK_RECOMMENDED_PROJECTS } from "@/mock/Dashboard";
import { Heading } from "@/components/ui/typography";
import { Button, LinkButton } from "@/components/ui/buttons";

const RecommendedProjects = () => {
  return (
    <div className="flex flex-col gap-4">
      <Heading level="h6" className="font-semibold text-content">
        Recommended for You
      </Heading>

      <ul className="flex flex-col gap-4">
        {MOCK_RECOMMENDED_PROJECTS.map((project) => (
          <li
            key={project.id}
            className="bg-white rounded-2xl border border-gray-100
              shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            <div className="flex flex-row gap-4">
              {/* thumbnail */}
              <div className="relative w-[15%] overflow-hidden">
                <Image
                  src="/images/team1.jpg"
                  alt={project.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              {/* content */}
              <div className="flex-1 min-w-0 flex flex-col gap-2 pl-2 pr-8 py-5">
                <p className="font-primary text-sm font-semibold text-content leading-snug">
                  {project.name}
                </p>
                <p
                  className="font-primary text-xs text-content-light leading-relaxed
                  line-clamp-2"
                >
                  {project.description}
                </p>

                {/* tags */}
                <div className="flex items-center gap-1.5 flex-wrap mb-3">
                  <span className="font-primary text-[11px] text-accent">
                    Looking for
                  </span>
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-primary-light
                        font-primary text-[11px] text-primary font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* action buttons */}
                <div className="flex gap-3 border-gray-100">
                  <Button variant="primary" size="sm" className="flex-1 py-3">
                    Request to join
                  </Button>
                  <LinkButton
                    variant="secondary"
                    size="sm"
                    className="flex-1 py-3"
                    href={`/dashboard/projects/${project.id}`}
                  >
                    View Details
                  </LinkButton>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedProjects;
