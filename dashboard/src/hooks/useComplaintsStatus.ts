import { useQuery } from "@tanstack/react-query";
import { api } from "../services/apiClient";

type ComplaintsStatus = {
  total: number;
  finished: number;
  pending: number;
};

type GetComplaintsStatusResponse = {
  complaintsStatus: ComplaintsStatus;
};

export async function getComplaintsStatus(): Promise<GetComplaintsStatusResponse> {
  const { data } = await api.get("/dashboard");
  
  return {
    complaintsStatus: {
      total: data.total,
      finished: data.finished,
      pending: data.pending,
    }
  };
}

export function useComplaintsStatus() {
  return useQuery(
    ["complaintsStatus"],
    () => getComplaintsStatus(),
    {
      staleTime: 1000 * 5, // 5 seconds
    }
  );
}
