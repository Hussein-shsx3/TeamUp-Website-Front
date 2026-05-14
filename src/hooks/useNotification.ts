import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "@/services/notification.service";

export const notificationQueryKeys = {
  list: () => ["notifications", "list"] as const,
  stats: () => ["notifications", "stats"] as const,
};

export const useNotifications = () => {
  const queryClient = useQueryClient();

  const notificationsQuery = useQuery({
    queryKey: notificationQueryKeys.list(),
    queryFn: () => notificationService.getMyNotifications(),
  });

  const statsQuery = useQuery({
    queryKey: notificationQueryKeys.stats(),
    queryFn: () => notificationService.getNotificationStats(),
  });

  const invalidateNotifications = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.list() }),
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.stats() }),
    ]);
  };

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => notificationService.markAsRead(id),
    onSuccess: invalidateNotifications,
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: invalidateNotifications,
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: (id: string) => notificationService.deleteNotification(id),
    onSuccess: invalidateNotifications,
  });

  const deleteAllNotificationsMutation = useMutation({
    mutationFn: () => notificationService.deleteAllNotifications(),
    onSuccess: invalidateNotifications,
  });

  return {
    notificationsQuery,
    statsQuery,
    markAsReadMutation,
    markAllAsReadMutation,
    deleteNotificationMutation,
    deleteAllNotificationsMutation,
  };
};