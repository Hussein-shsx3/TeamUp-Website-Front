"use client";

import api from "@/lib/axios";
import type { PaymentsListResponse } from "@/types/payment";

const PAYMENT_BASE_PATH = "/payments";

type PaymentQueryValue = string | number | boolean | undefined;

const buildQueryString = (query?: Record<string, PaymentQueryValue>) => {
  const searchParams = new URLSearchParams();

  if (!query) {
    return "";
  }

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    searchParams.set(key, String(value));
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
};

export const paymentService = {
  async getPayments(query?: Record<string, PaymentQueryValue>) {
    const { data } = await api.get<PaymentsListResponse>(
      `${PAYMENT_BASE_PATH}${buildQueryString(query)}`,
    );

    return data;
  },
};