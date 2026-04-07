import Image from "next/image";

interface ProjectsStatsProps {
  activeCount: number;
  completedCount: number;
}

const StatBox = ({ title, value, iconSrc, iconAlt }: { title: string; value: number; iconSrc: string; iconAlt: string }) => (
  <div className="w-full flex flex-1 flex-col items-center gap-2 rounded-lg border border-gray-100 bg-white px-4 py-6 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
      <Image src={iconSrc} alt={iconAlt} width={30} height={30} />
    </div>
    <p className="font-primary text-xs text-content-light">{title}</p>
    <p className="font-primary text-2xl font-semibold text-content">{value.toString().padStart(2, "0")}</p>
  </div>
);

const ProjectsStats = ({ activeCount, completedCount }: ProjectsStatsProps) => {
  return (
    <div className="w-full py-4 sm:py-5">
      <div className="flex flex-wrap gap-4">
        <StatBox title="Active Projects" value={activeCount} iconSrc="/images/graduation-scroll.svg" iconAlt="Active projects" />
        <StatBox title="Completed Projects" value={completedCount} iconSrc="/images/file-02.svg" iconAlt="Completed projects" />
      </div>
    </div>
  );
};

export default ProjectsStats;
