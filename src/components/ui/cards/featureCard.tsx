import Image from "next/image";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  iconAlt: string;
  bg: string;
  iconBg: string;
  offset: string;
  index: number;
}
const FeatureCard = ({
  title,
  description,
  icon,
  iconAlt,
  bg,
  iconBg,
  offset,
  index,
}: FeatureCardProps) => {
  return (
    <div
      className={`relative flex flex-col items-center ${offset}`}
      data-aos="fade-up"
      data-aos-delay={`${index * 150}`}
    >
      {/* Floating icon badge */}
      <div
        className={`relative z-10 flex items-center justify-center rounded-full  border-[4px] border-white
          mb-[-22px] ${iconBg} w-14 h-14`}
      >
        <div className={`relative w-6 h-6`}>
          <Image
            src={icon}
            alt={iconAlt}
            fill
            className="object-contain brightness-0 invert"
          />
        </div>
      </div>

      {/* Card body */}
      <div
        className={`relative z-0 ${bg} rounded-2xl text-white
          flex flex-col items-center
          px-6 pt-8 pb-7
          min-h-[235px]
          w-full shadow-xl`}
      >
        <h3
          className={`leading-snug mb-4 w-[65%] text-center tracking-wide
            text-lg`}
        >
          {title}
        </h3>
        <p
          className={`font-primary leading-relaxed text-white/90 tracking-wider
            text-sm`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
