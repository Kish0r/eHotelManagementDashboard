import { LoginResponse, PaginatedUser } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const authUser = async (
  userDetail: FormData
): Promise<LoginResponse> => {
  try {
    const res = await fetch(`${API_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: userDetail.get("username") as string,
        password: userDetail.get("password") as string,
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error logging in:", error);
    return Promise.reject("Failed to log in. Please try again.");
  }
};

export const getCustomers = async (
  skip: number,
  limit: number
): Promise<PaginatedUser> => {
  try {
    const queryParams = new URLSearchParams({
      skip: skip.toString(),
      limit: limit.toString(),
    });
    const res = await fetch(`${API_URL}/dashboard/customers?${queryParams}`, {
      method: "GET",
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export const deleteCustomer = async (id: string): Promise<void> => {
  try {
    const queryParams = new URLSearchParams({
      user_id: id,
    });
    const res = await fetch(`${API_URL}/dashboard/delete-user?${queryParams}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (error) {
    console.error("Error deleting room:", error);
    throw error;
  }
};
