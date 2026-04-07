interface SkillsCardProps {
  skills: string[];
}

const SkillsCard = ({ skills }: SkillsCardProps) => {
  return (
    <div className="border border-gray-100 px-4 py-4 sm:px-6 sm:py-5 rounded-lg">
      <p className="mb-3 font-primary text-sm font-semibold text-content">
        My Skills
      </p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="max-w-full break-words rounded-full bg-primary-light px-2.5 py-1
              font-primary text-xs font-medium text-primary sm:px-3"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsCard;
