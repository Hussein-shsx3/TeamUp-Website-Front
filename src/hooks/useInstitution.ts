import { useQuery } from "@tanstack/react-query";
import { institutionService } from "@/services/institution.service";

export const institutionQueryKeys = {
  universities: () => ["institutions", "universities"] as const,
  colleges: (universityId: string) => ["institutions", "colleges", universityId] as const,
  departments: (collegeId: string) => ["institutions", "departments", collegeId] as const,
};

export const useUniversities = () =>
  useQuery({
    queryKey: institutionQueryKeys.universities(),
    queryFn: () => institutionService.getUniversities(),
  });

export const useColleges = (universityId?: string | null) =>
  useQuery({
    queryKey: institutionQueryKeys.colleges(universityId ?? ""),
    queryFn: () => institutionService.getColleges(universityId ?? ""),
    enabled: Boolean(universityId),
  });

export const useDepartments = (collegeId?: string | null) =>
  useQuery({
    queryKey: institutionQueryKeys.departments(collegeId ?? ""),
    queryFn: () => institutionService.getDepartments(collegeId ?? ""),
    enabled: Boolean(collegeId),
  });

export const useUniversityName = (universityId?: string | null) => {
  const universitiesQuery = useUniversities();

  const universityName =
    universitiesQuery.data?.universities.find((university) => university.id === universityId)
      ?.name ?? "";

  return {
    universityName,
    isLoading: universitiesQuery.isLoading,
  };
};