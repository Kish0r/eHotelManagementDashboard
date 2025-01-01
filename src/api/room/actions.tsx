"use server";
import axios from "axios";
import { Room, PagintedRoom, CreateRoom } from "@/types/room";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getRooms = async (
  skip: number = 0,
  limit: number = 10
): Promise<PagintedRoom> => {
  try {
    const queryParams = new URLSearchParams({
      skip: skip.toString(),
      limit: limit.toString(),
    });

    const res = await fetch(`${BASE_URL}/rooms?${queryParams}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch rooms: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export const getRoomById = async (id: string): Promise<Room> => {
  try {
    const res = await fetch(`${BASE_URL}/rooms/id/${id}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch room: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching room:", error);
    throw error;
  }
};

export const createRoom = async (room: FormData) => {
  try {
    console.log("Sending FormData:");
    room.forEach((value, key) => {
      if (value instanceof File) {
        console.log(
          `${key}: File - ${value.name} (${value.type}, ${value.size} bytes)`
        );
      } else {
        console.log(`${key}: ${value}`);
      }
    });

    const res = await axios.post(`${BASE_URL}/rooms`, room, {
      headers: {
        Accept: "application/json", 
        "Content-Type": "multipart/form-data", 
      },
    });

    console.log("Response received:", res.data);
    return res.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error response:",
        error.response?.data || error.message
      );
      throw new Error(
        `Failed to create room: ${error.response?.status || "Unknown status"} ${
          error.response?.statusText || ""
        }\nResponse: ${JSON.stringify(error.response?.data || {})}`
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error occurred while creating room.");
    }
  }
};

export const updateRoom = async (id: string, room: FormData): Promise<Room> => {
  try {
    console.log("Sending FormData:");
    room.forEach((value, key) => {
      if (value instanceof File) {
        console.log(
          `${key}: File - ${value.name} (${value.type}, ${value.size} bytes)`
        );
      } else {
        console.log(`${key}: ${value}`);
      }
    });
    const res = await fetch(`${BASE_URL}/rooms/${id}`, {
      method: "PUT",
      body: room,
    });

    if (!res.ok) {
      throw new Error(`Failed to update room: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error updating room:", error);
    throw error;
  }
};

export const deleteroom = async (id: string): Promise<void> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to delete room: ${res.status} ${res.statusText}`);
    }

    console.log(`Room with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting room:", error);
    throw error;
  }
};
