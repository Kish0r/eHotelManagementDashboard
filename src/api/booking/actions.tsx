"use server";

import { Booking, PaginatedBookings } from "@/types/booking";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getBooking = async (
  skip: number = 0,
  limit: number = 10
): Promise<PaginatedBookings> => {
  try {
    const queryParams = new URLSearchParams({
      skip: skip.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(`${BASE_URL}/bookings?${queryParams}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch booking: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error;
  }
};

export const createBooking = async (booking: Booking): Promise<Booking> => {
  try {
    const response = await fetch(`${BASE_URL}/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to create booking: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export const deleteBooking = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/booking/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete booking: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};

export const updateBooking = async (booking: Booking): Promise<Booking> => {
  try {
    const response = await fetch(`${BASE_URL}/booking/${booking.booking_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update booking: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

export const getBookingById = async (id: string): Promise<Booking> => {
  try {
    const response = await fetch(`${BASE_URL}/booking/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch booking: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error;
  }
};

export const getBookingsByUserId = async (
  userId: string
): Promise<Booking[]> => {
  try {
    const response = await fetch(`${BASE_URL}/booking/${userId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch bookings: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

export const updateBookingStatus = async (
  id: string,
  status: string
): Promise<void> => {
  try {
    const queryParams = new URLSearchParams({
      status: status,
    })
    
    const response = await fetch(`${BASE_URL}/bookings/${id}/status?${queryParams}`, {
      
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update booking status: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
};
