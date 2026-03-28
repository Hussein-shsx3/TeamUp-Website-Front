interface AcademicCardProps {
  university: string;
  major: string;
}

const AcademicCard = ({ university, major }: AcademicCardProps) => {
  return (
    <div className="border-t border-gray-100 px-4 py-4 sm:px-6 sm:py-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        {/* University */}
        <div className="flex min-w-0 flex-col gap-2">
          <p className="font-primary text-sm font-semibold text-content">
            University
          </p>
          <div className="rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2.5 sm:px-4">
            <p className="break-words font-primary text-sm text-content">{university}</p>
          </div>
        </div>

        {/* Major */}
        <div className="flex min-w-0 flex-col gap-2">
          <p className="font-primary text-sm font-semibold text-content">
            Major
          </p>
          <div className="rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2.5 sm:px-4">
            <p className="break-words font-primary text-sm text-content">{major}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicCard;
