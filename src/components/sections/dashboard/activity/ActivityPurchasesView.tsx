"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ProjectCard } from "@/components/ui/cards";
import { paymentService } from "@/services/payment.service";
import { projectService } from "@/services/project.service";

const ActivityPurchasesView = () => {
  const router = useRouter();

  const purchasesQuery = useQuery({
    queryKey: ["payments", "activity", "purchases"],
    queryFn: async () => {
      const { payments } = await paymentService.getPayments();

      const records = await Promise.all(
        payments.map(async (payment) => {
          const { project } = await projectService.getProjectById(payment.projectId);

          return {
            id: payment.id,
            projectId: payment.projectId,
            title: project.title,
            description: project.summary || project.description || "",
            postedBy:
              [project.creator.firstName, project.creator.lastName].filter(Boolean).join(" ") ||
              project.creator.username,
            mentorAvatar: project.creator.profilePictureUrl ?? "/images/user.png",
            price: payment.amount > 0 ? ("paid" as const) : ("free" as const),
            priceAmount: payment.amount > 0 ? payment.amount : undefined,
            statusLabel: payment.status === "SUCCESS" ? "Purchased" : payment.status,
          };
        }),
      );

      return records;
    },
  });

  if (purchasesQuery.isLoading) {
    return <p className="mt-6 font-primary text-sm text-content-light">Loading purchases...</p>;
  }

  if (purchasesQuery.isError) {
    return (
      <p className="mt-6 font-primary text-sm text-error">
        Failed to load purchases from the server.
      </p>
    );
  }

  if (purchasesQuery.data?.length === 0) {
    return (
      <p className="mt-6 font-primary text-sm text-content-light">
        No purchases found yet.
      </p>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:gap-6">
      {purchasesQuery.data?.map((item) => (
        <ProjectCard
          key={item.id}
          variant="purchased"
          id={item.id}
          title={item.title}
          description={item.description}
          price={item.price}
          priceAmount={item.priceAmount}
          postedBy={item.postedBy}
          mentorAvatar={item.mentorAvatar}
          statusLabel={item.statusLabel}
          onAction={() => router.push(`/dashboard/projects-ideas/${item.projectId}`)}
        />
      ))}
    </div>
  );
};

export default ActivityPurchasesView;