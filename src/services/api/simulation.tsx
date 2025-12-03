import rootApi from "./rootApi";
import { Simulation } from "@/types/Simulation";
export const getSimulation = async (): Promise<Simulation[]> => {
  try {
    const response = await rootApi.get<Simulation[]>("/userSimulation");
    return response.data;
  } catch (error) {
    console.error("Error fetching simulation:", error);
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(message || "Failed to fetch simulation");
  }
};
