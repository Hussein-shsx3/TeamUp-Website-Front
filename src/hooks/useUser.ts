import { useMutation, useQuery } from "@tanstack/react-query";
import { getStoredAuthToken } from "@/lib/axios";
import { userService } from "@/services/user.service";
import type { UpdateMePayload } from "@/types/user";

export const userQueryKeys = {
  me: (token?: string) => ["user", "me", token ?? "anonymous"] as const,
};

export const useCurrentUser = () => {
  const token = getStoredAuthToken();

  return useQuery({
    queryKey: userQueryKeys.me(token ?? undefined),
    queryFn: () => userService.getMe(),
    enabled: Boolean(token),
  });
};

export const userProfileQueryKeys = {
  completion: (token?: string) => ["user", "completion", token ?? "anonymous"] as const,
};

export const useProfileCompletion = () => {
  const token = getStoredAuthToken();

  return useQuery({
    queryKey: userProfileQueryKeys.completion(token ?? undefined),
    queryFn: () => userService.getProfileCompletion(),
    enabled: Boolean(token),
  });
};

export const useUpdateCurrentUser = () =>
  useMutation({
    mutationFn: (payload: UpdateMePayload) => userService.updateMe(payload),
  });

export const useUpdateCurrentUserProfilePicture = () =>
  useMutation({
    mutationFn: (formData: FormData) =>
      userService.updateProfilePicture(formData),
  });
