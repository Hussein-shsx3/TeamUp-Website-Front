export type OAuthProvider = "google" | "github" | "linkedin";

export type OAuthRole = "STUDENT" | "MENTOR" | "GRADUATE";

export const OAUTH_ROLE_OPTIONS: Array<{ value: OAuthRole; label: string }> = [
  { value: "STUDENT", label: "Student" },
  { value: "MENTOR", label: "Mentor" },
  { value: "GRADUATE", label: "Graduate" },
];

export const OAUTH_UNIVERSITY_OPTIONS = [
  "Islamic University of Gaza",
  "Al-Azhar University - Gaza",
  "Al-Aqsa University",
  "University College of Applied Sciences (UCAS)",
  "Gaza University",
  "Palestine Technical College - Deir al-Balah",
  "Al-Quds Open University - Gaza Branch",
  "Palestine University - Gaza",
  "Israa University",
  "University of Palestine",
  "American University of Gaza",
  "University of Science and Technology - Gaza",
  "Aqsa University",
].map((university) => ({ value: university, label: university }));

export const OAUTH_PROVIDER_LABELS: Record<OAuthProvider, string> = {
  google: "Google",
  github: "GitHub",
  linkedin: "LinkedIn",
};

export const OAUTH_PROVIDER_DESCRIPTIONS: Record<OAuthProvider, string> = {
  google: "Google sign-in detected.",
  github: "GitHub sign-in detected.",
  linkedin: "LinkedIn sign-in detected.",
};
