import Image from "next/image";
import { Button, LinkButton } from "@/components/ui/buttons";
import { ProgressBar } from "@/components/ui/feedback";
import type { FindTeamProject } from "@/mock/FindTeam";

interface FindTeamProjectCardProps {
  project: FindTeamProject;
}

const FindTeamProjectCard = ({ project }: FindTeamProjectCardProps) => {
  const {
    id,
    name,
    description,
    image,
    teamCapacity,
    currentMembers,
    lookingFor,
    status,
  } = project;

  const isFull = status === "Full";
  const progressValue = Math.round((currentMembers / teamCapacity) * 100);

  return (
    <article
      className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white
        shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow duration-200
        hover:shadow-[0_4px_20px_rgba(37,99,235,0.10)]"
    >
      {/* Thumbnail */}
      <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-48">
        <Image
          src={image}
          alt={name}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Title */}
        <h3 className="font-primary text-base font-semibold leading-tight text-content-light">
          {name}
        </h3>

        {/* Description */}
        <p className="font-primary text-xs leading-relaxed text-content-light line-clamp-3">
          {description}
        </p>

        {/* Team Capacity — blue label + member count + progress bar */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="font-primary text-xs font-semibold text-primary">
              Team Capacity
            </span>
            <span className="font-primary text-xs font-semibold text-content-light">
              {currentMembers}/{teamCapacity} member
            </span>
          </div>
          <ProgressBar value={progressValue} />
        </div>

        {/* Looking for tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-primary text-xs text-accent-dark shrink-0">
            Looking for
          </span>
          {lookingFor.map((tag, i) => (
            <span
              key={i}
              className="rounded-md bg-primary-light px-2 py-0.5 font-primary text-[11px]
                font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-col gap-2 pt-1">
          <Button
            type="button"
            variant="primary"
            size="md"
            disabled={isFull}
            className="w-full justify-center"
            onClick={() => console.log("request to join (mock)", id)}
          >
            {isFull ? "Team is Full" : "Request to join"}
          </Button>
          <LinkButton
            href={`/dashboard/find-team/${id}`}
            variant="secondary"
            size="md"
            className="w-full justify-center"
          >
            View Details
          </LinkButton>
        </div>
      </div>
    </article>
  );
};

export default FindTeamProjectCard;
