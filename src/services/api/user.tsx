import rootApi from "./rootApi";
import { User } from "@/types/User";

export const getUserById = async (): Promise<User> => {
  try {
    const response = await rootApi.get<User>("/user/1");
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(message || "Failed to fetch user");
  }
};
