interface MentorAreaCardProps {
  skills: string[];
}

const MentorAreaCard = ({ skills }: MentorAreaCardProps) => {
  return (
    <div className="px-4 py-4 sm:px-6 sm:py-5 border border-gray-100 rounded-lg my-4">
      <p className="mb-3 font-primary font-semibold text-content">
        Area of Experience
      </p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded bg-primary-light px-2 py-1
            font-primary text-[10px] font-medium text-primary"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MentorAreaCard;
