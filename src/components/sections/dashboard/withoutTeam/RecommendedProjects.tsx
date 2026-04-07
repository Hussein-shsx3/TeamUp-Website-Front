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
            <div className="flex flex-col sm:flex-row sm:gap-0">
              {/* thumbnail — full-width banner on small screens; fixed column on sm+ */}
              <div
                className="relative w-full shrink-0 aspect-[16/9] max-h-[min(220px,45vh)] sm:aspect-auto
                  sm:w-40 sm:min-w-[10rem] md:w-44 md:min-w-[11rem] sm:max-h-none sm:min-h-[168px] sm:self-stretch"
              >
                <Image
                  src={"/images/Team.jpg"}
                  alt={project.name}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 176px"
                />
              </div>

              {/* content */}
              <div className="flex-1 min-w-0 flex flex-col gap-2 px-4 pb-5 pt-4 sm:pl-4 sm:pr-8 sm:py-5">
                <p className="font-primary text-sm font-semibold text-content leading-snug">
                  {project.name}
                </p>
                <p
                  className="font-primary text-xs text-content-light leading-relaxed
                  line-clamp-2 sm:line-clamp-3"
                >
                  {project.description}
                </p>

                {/* tags */}
                <div className="flex items-center gap-1.5 flex-wrap mb-1 sm:mb-3">
                  <span className="font-primary text-[11px] text-accent shrink-0">
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
                {/* action buttons — stack on narrow screens */}
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 mt-auto">
                  <Button variant="primary" size="sm" className="w-full sm:flex-1 py-3">
                    Request to join
                  </Button>
                  <LinkButton
                    variant="secondary"
                    size="sm"
                    className="w-full sm:flex-1 py-3"
                    href={`/dashboard/projects-ideas/${project.id}`}
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
