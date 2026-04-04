import Image from "next/image";
import { LinkButton } from "@/components/ui/buttons";

interface NoResultsStateProps {
  imageSrc?: string;
  imageAlt?: string;
  message: string;
  actionLabel: string;
  actionHref: string;
  className?: string;
}

const NoResultsState = ({
  imageSrc = "/images/noResults.svg",
  imageAlt = "No results",
  message,
  actionLabel,
  actionHref,
  className = "",
}: NoResultsStateProps) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 text-center ${className}`}>
      <Image src={imageSrc} alt={imageAlt} width={260} height={260} unoptimized priority />
      <p className="mt-6 max-w-lg font-primary text-sm leading-relaxed text-content-light">
        {message}
      </p>
      <LinkButton href={actionHref} variant="primary" size="lg" className="mt-8 w-full max-w-sm">
        {actionLabel}
      </LinkButton>
    </div>
  );
};

export default NoResultsState;