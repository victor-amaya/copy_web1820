import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { UserData } from "@/lib/types";

export interface CreateUserRequest {
  nombres: string;
  apellidos: string;
  dni: string;
  celular: string;
  email: string;
  fechaNacimiento?: string;
  password: string;
  aceptaDatos?: boolean;
  aceptaAnuncios?: boolean;
}

export interface CreateBlockRequestBody {
  userDni: string;
  selectedProducts: any[];
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (userData: CreateUserRequest) => {
      return apiRequest({
        method: "POST",
        endpoint: "/api/users",
        body: userData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useCreateBlockRequest = () => {
  return useMutation({
    mutationFn: async (blockData: CreateBlockRequestBody) => {
      return apiRequest({
        method: "POST",
        endpoint: "/api/block-requests",
        body: blockData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["block-requests"] });
    },
  });
};