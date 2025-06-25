import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, getQueryFn } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";

export interface BlockRequest {
  id: number;
  userId: string;
  selectedProducts: string;
  status: string;
  requestType: string;
  priority: string;
  reason?: string;
  processedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export const useBlockRequests = () => {
  return useQuery({
    queryKey: ["/api/block-requests"],
    queryFn: getQueryFn<BlockRequest[]>({ on401: "throw" }),
  });
};

export const useBlockRequestsByUser = (userDni: string) => {
  return useQuery({
    queryKey: ["/api/block-requests/user", userDni],
    queryFn: getQueryFn<BlockRequest[]>({ on401: "throw" }),
    enabled: !!userDni,
  });
};

export const useUpdateBlockRequestStatus = () => {
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return apiRequest({
        method: "PATCH",
        endpoint: `/api/block-requests/${id}/status`,
        body: { status },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/block-requests"] });
    },
  });
};