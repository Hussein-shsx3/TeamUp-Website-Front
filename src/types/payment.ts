import type { ProjectRecord } from "@/types/project";

export interface PaymentRecord {
  id: string;
  buyerId: string;
  projectId: string;
  amount: number;
  status: string;
  paymentMethod: string | null;
  transactionId: string | null;
  processedAt: string | null;
  createdAt: string;
  updatedAt: string;
  project: Pick<ProjectRecord, "id" | "title" | "price">;
}

export interface PaymentsListResponse {
  success: boolean;
  message: string;
  results: number;
  payments: PaymentRecord[];
}