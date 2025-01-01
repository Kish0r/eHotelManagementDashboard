"use server";

import { Complaint, PaginatedComplaints } from "@/types/complaints";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getComplaints = async (
  skip: number,
  limit: number,
): Promise<PaginatedComplaints> => {
  try {
    const queryParams = new URLSearchParams({
      skip: skip.toString(),
      limit: limit.toString(),
    });
    const res = await fetch(`${BASE_URL}/complaints/?${queryParams}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch complaints: ${res.status} ${res.statusText}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching complaints:", error);
    throw error;
  }
};

export const updateStatus = async (id: string, status: string) => {
  try {
    const queryParams = new URLSearchParams({
      status: status,
    });
    await fetch(`${BASE_URL}/complaints/${id}/status?${queryParams}`, {
      method: "PATCH",
      headers: {
        accept: "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

export const deleteComplaint = async (id: string): Promise<void> => {
  try {
    const res = await fetch(`${BASE_URL}/complaints/${id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to delete complaint: ${res.status} ${res.statusText}`
      );
    }
  } catch (error) {
    console.error("Error deleting complaint:", error);
    throw error;
  }
};
