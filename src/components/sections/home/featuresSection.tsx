import { FeatureCard } from "@/components/ui/cards";
import { Container } from "@/components/layout";
import { Heading } from "@/components/ui/typography";
import Image from "next/image";
import { FEATURES } from "@/mock";

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative w-full bg-sbackground py-20 md:py-28"
    >
      <Container>
        {/* Section header */}
        <div className="text-center mb-10 md:mb-10" data-aos="fade-up">
          <Heading level="h3" className="text-content font-medium mb-3">
            Our Features
          </Heading>
          <p className="font-primary text-content-light text-base max-w-xs mx-auto leading-relaxed">
            Streamline your journey from the first idea to the final submission
          </p>
        </div>
        {/* Cards + connecting SVG line */}
        <div className="relative">
          {/* Curved connector line — desktop only */}

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20 relative z-10">
            {FEATURES.map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} index={i} />
            ))}
          </div>
        </div>{" "}
        <div
          className="hidden md:block absolute inset-0 pointer-events-none translate-y-24"
          aria-hidden="true"
        >
          <Image
            src="/images/Vector.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <div
          className="absolute -bottom-10 right-[15%] w-16 md:w-20 h-16 md:h-20 pointer-events-none"
          aria-hidden="true"
        >
          <Image
            src="/images/elements (2).svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;
