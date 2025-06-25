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
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Error al crear usuario");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useCreateBlockRequest = () => {
  return useMutation({
    mutationFn: async (blockData: CreateBlockRequestBody) => {
      const response = await fetch("/api/block-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blockData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Error al crear solicitud de bloqueo");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["block-requests"] });
    },
  });
};