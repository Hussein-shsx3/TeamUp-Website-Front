"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BadgeCheck,
  CheckCircle2,
  CircleUserRound,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Heading } from "@/components/ui/typography";
import { Input, Select, SubmitButton, TagInput } from "@/components/ui/forms";
import { useUpdateCurrentUser } from "@/hooks/useUser";
import { institutionService } from "@/services/institution.service";
import { syncOAuthSession } from "@/lib/oauth";
import {
  OAUTH_PROVIDER_DESCRIPTIONS,
  OAUTH_PROVIDER_LABELS,
  OAUTH_UNIVERSITY_OPTIONS,
  type OAuthProvider,
} from "./oauth.constants";

const getProvider = (value: string | null): OAuthProvider => {
  if (value === "github" || value === "linkedin" || value === "google") {
    return value;
  }

  return "google";
};

const OAuthCompleteProfilePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSessionReady, setIsSessionReady] = useState(false);

  const provider = useMemo(
    () => getProvider(searchParams.get("provider")),
    [searchParams],
  );
  const displayName = searchParams.get("name") ?? "Your account";
  const email = searchParams.get("email") ?? "your-email@example.com";
  const firstTime = searchParams.get("firstTime") !== "false";

  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveError, setSaveError] = useState("");
  const updateCurrentUser = useUpdateCurrentUser();

  const universitiesQuery = useQuery({
    queryKey: ["institutions", "universities"],
    queryFn: () => institutionService.getUniversities(),
    enabled: isSessionReady,
  });

  const universityOptions = useMemo(() => {
    const universities = universitiesQuery.data?.universities ?? [];
    const seenUniversityIds = new Set<string>();
    const uniqueOptions: Array<{ value: string; label: string }> = [];

    OAUTH_UNIVERSITY_OPTIONS.forEach((option) => {
      const match = universities.find((university) => {
        const universityName = university.name.toLowerCase();
        const optionName = option.label.toLowerCase();

        return (
          universityName === optionName ||
          universityName.includes(optionName) ||
          optionName.includes(universityName)
        );
      });

      if (match && !seenUniversityIds.has(match.id)) {
        seenUniversityIds.add(match.id);
        uniqueOptions.push({ value: match.id, label: match.name });
      }
    });

    return uniqueOptions;
  }, [universitiesQuery.data]);

  useEffect(() => {
    let isMounted = true;

    const prepareSession = async () => {
      const token = await syncOAuthSession();

      if (!isMounted) {
        return;
      }

      if (!token) {
        router.replace("/auth?mode=signin");
        return;
      }

      setIsSessionReady(true);
    };

    void prepareSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleContinue = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!university) {
      setSaveError("Please select your university.");
      return;
    }

    setIsSubmitting(true);
    setSaveError("");

    const token = await syncOAuthSession();

    if (!token) {
      setIsSubmitting(false);
      router.replace("/auth?mode=signin");
      return;
    }

    try {
      await updateCurrentUser.mutateAsync({
        universityId: university,
        major: major.trim() || null,
        skills,
      });
    } catch {
      setIsSubmitting(false);
      setSaveError("Failed to save your profile details.");
      return;
    }

    router.replace("/dashboard/profile");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#f4f8ff] text-content">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.16),_transparent_36%),radial-gradient(circle_at_80%_20%,_rgba(14,165,233,0.14),_transparent_28%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_100%)]" />
        <div className="absolute left-0 top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid w-full gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:gap-10">
            <section className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_30px_90px_rgba(37,99,235,0.12)] backdrop-blur xl:p-10">
              <div className="absolute right-6 top-6 rounded-full bg-primary-light px-4 py-2 text-xs font-semibold text-primary">
                <span>{OAUTH_PROVIDER_LABELS[provider]}</span>
              </div>

              <div className="max-w-xl pt-14 xl:pt-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-light px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Finish setup
                </div>

                <Heading level="h2" className="mt-5 text-content leading-tight font-semibold">
                  Complete your TeamUp profile
                </Heading>

                <p className="mt-4 max-w-2xl font-primary text-sm leading-7 text-content-light sm:text-base">
                  We signed you in through {OAUTH_PROVIDER_LABELS[provider]}. Before we take you into the
                  platform, choose the university and academic details that best match your account.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      icon: CircleUserRound,
                      title: "Identity",
                      text: displayName,
                    },
                    { icon: BadgeCheck, title: "Provider", text: OAUTH_PROVIDER_DESCRIPTIONS[provider] },
                    { icon: CheckCircle2, title: "Next step", text: firstTime ? "Complete details and continue" : "Go straight to your dashboard" },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-white/80 bg-white px-2 py-2 shadow-[0_12px_30px_rgba(15,23,42,0.05)]"
                    >
                      <div className="flex justify-center items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full text-primary">
                          <item.icon size={18} aria-hidden="true" />
                        </span>
                        <div>
                          <p className="font-primary text-xs font-medium uppercase tracking-[0.14em] text-content-light">
                            {item.title}
                          </p>
                          <p className="mt-1 font-primary text-sm font-medium text-content">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-[1.75rem] border border-white/80 bg-[linear-gradient(135deg,_rgba(37,99,235,0.08),_rgba(14,165,233,0.04))] p-5 shadow-[0_20px_50px_rgba(37,99,235,0.08)]">
                  <p className="font-primary text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Why this step exists
                  </p>
                  <p className="mt-3 max-w-2xl font-primary text-sm leading-7 text-content-light">
                    OAuth gives us a trusted login, but TeamUp still needs your university and academic details to
                    build the right dashboard, permissions, and project experience.
                  </p>
                </div>
              </div>
            </section>

            <section className="relative rounded-[2rem] border border-white/70 bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.10)] xl:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-primary text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Account details
                  </p>
                  <Heading level="h4" className="mt-2 font-semibold text-content">
                    Tell us more about you
                  </Heading>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <p className="font-primary text-xs font-semibold uppercase tracking-[0.14em] text-content-light">
                  Connected account
                </p>
                <div className="mt-3 flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white font-semibold">
                    {displayName
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-primary text-base font-semibold text-content">
                      {displayName}
                    </p>
                    <p className="truncate font-primary text-sm text-content-light">
                      {email}
                    </p>
                    <p className="mt-1 font-primary text-xs text-primary">
                      {OAUTH_PROVIDER_LABELS[provider]} login connected
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                <Select
                  id="oauth-university"
                  label="University"
                  options={[
                    {
                      value: "",
                      label: universitiesQuery.isLoading
                        ? "Loading universities..."
                        : "Select your university",
                    },
                    ...universityOptions,
                  ]}
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                />

                <Input
                  id="oauth-major"
                  label="Major of study"
                  placeholder="Optional for now"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                />

                <TagInput
                  id="oauth-skills"
                  label="Skills"
                  value={skills}
                  onChange={setSkills}
                  placeholder="Add a skill and press Enter"
                />

                <div className="rounded-2xl border border-primary/10 bg-primary-light/40 p-4">
                  <p className="font-primary text-sm text-content leading-7">
                    After you continue, we&apos;ll save your details and send you straight into the dashboard.
                  </p>
                </div>

                {saveError ? (
                  <p className="font-primary text-sm text-error">{saveError}</p>
                ) : null}

                <div className="mt-1 flex flex-col gap-3 sm:flex-row">
                  <SubmitButton
                    label={isSubmitting ? "Saving..." : "Save and continue"}
                    onClick={handleContinue}
                    disabled={isSubmitting || !isSessionReady || !university}
                  />

                  <Link
                    href="/auth?mode=signin"
                    className="inline-flex w-[35%] h-12 items-center justify-center rounded-xl border border-gray-200 bg-white px-5 font-primary text-sm font-semibold text-content transition-colors hover:border-primary hover:text-primary"
                  >
                    Back to login
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OAuthCompleteProfilePage;
