import { useMutation } from "@tanstack/react-query";
import {
  joinRequestService,
  type CreateJoinRequestPayload,
} from "@/services/join-request.service";

export const useCreateJoinRequest = () =>
  useMutation({
    mutationFn: (payload: CreateJoinRequestPayload) =>
      joinRequestService.createRequest(payload),
  });