import { PaginatedPayment } from "@/types/payment";
import { stat } from "fs";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getPayment = async (
  skip: number = 0,
  limit: number = 10
): Promise<PaginatedPayment> => {
  try {
    const queryParams = new URLSearchParams({
      skip: skip.toString(),
      limit: limit.toString(),
    });
    const res = await fetch(`${API_URL}/dashboard/payments?${queryParams}`, {
      method: "GET",
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export const updatePayment = async (id: string, status: string): Promise<void> => {
  try {
    const queryParams = new URLSearchParams({
      status: status,
    });
    const res = await fetch(
      `${API_URL}/dashboard/payment/${id}?${queryParams}`,
      {
        method: "PATCH",
      }
    );
    return await res.json();
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};
