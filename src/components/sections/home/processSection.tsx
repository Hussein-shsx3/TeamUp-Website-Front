import Image from "next/image";
import { Container } from "@/components/layout";
import { Heading } from "@/components/ui/typography";
import { STEPS } from "@/mock";

const ProcessSection = () => {
  return (
    <section id="process" className="bg-primary py-20 md:py-28 overflow-hidden">
      <Container>
        {/* ── Section Header ── */}
        <div className="text-center mb-16 md:mb-20" data-aos="fade-up">
          <Heading level="h3" className="font-medium text-white mb-3">
            How It Works
          </Heading>
          <p className="font-primary text-white/70 text-sm md:text-base">
            Your Journey to Success in 4 Simple Steps
          </p>
        </div>

        {/* ── Steps Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-4 relative">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center gap-5"
              data-aos="fade-up"
              data-aos-delay={`${i * 150}`}
            >
              {/* Circle + line row */}
              <div className="relative w-full flex items-center justify-center">
                {/* Number circle */}
                <div
                  className="relative z-10 w-20 h-20 rounded-full border-2 bg-white
                  flex items-center justify-center flex-shrink-0"
                >
                  <span className="font-bold text-primary text-3xl tracking-wider">
                    {step.number}
                  </span>
                </div>

                {/* Dashed line — sits to the right of circle, centered vertically, desktop only */}
                {step.showLine && (
                  <div
                    className="hidden md:block absolute w-[80px] lg:w-[130px] xl:w-[145px] top-1/2 -translate-y-1/2 md:left-[80%] lg:left-[75%] xl:left-[79%]"
                    aria-hidden="true"
                  >
                    <Image
                      src="/images/Line 1.svg"
                      alt=""
                      width={153}
                      height={4}
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </div>

              {/* Step text */}
              <div className="flex flex-col gap-2 px-2">
                <h3 className="font-medium text-white text-base">
                  {step.title}
                </h3>
                <p className="font-primary text-white/70 text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ProcessSection;
