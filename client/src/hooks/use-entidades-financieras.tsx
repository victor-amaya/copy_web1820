import { useQuery } from "@tanstack/react-query";
import { Bank } from "@/lib/types";

export interface EntidadFinanciera {
  id: number;
  nombre: string;
  codigo: string;
  logoUrl: string | null;
  activo: boolean;
  createdAt: string;
}

// Mapeo de logos estáticos
const logoMapping: Record<string, string> = {
  bcp: "/attached_assets/BCP_1750612075168.png",
  bbva: "/attached_assets/BBVA_1750612279628.png",
  interbank: "/attached_assets/Interbank_1750612206510.png",
  scotiabank: "/attached_assets/Scotiabank_1750612351732.png",
};

// Mapeo de colores por banco
const colorMapping: Record<string, string> = {
  bcp: "bg-blue-600",
  bbva: "bg-blue-700",
  interbank: "bg-teal-600",
  scotiabank: "bg-red-600",
};

// Mapeo de nombres cortos
const shortNameMapping: Record<string, string> = {
  bcp: "BCP",
  bbva: "BBVA",
  interbank: "IB",
  scotiabank: "SB",
};

const transformEntidadToBank = (entidad: EntidadFinanciera): Bank => ({
  id: entidad.id,
  codigo: entidad.codigo,
  nombre: entidad.nombre,
  logoUrl: entidad.logoUrl,
  activo: entidad.activo,
  // Propiedades de compatibilidad
  code: entidad.codigo,
  name: entidad.nombre,
  color: colorMapping[entidad.codigo] || "bg-gray-600",
  shortName: shortNameMapping[entidad.codigo] || entidad.codigo.toUpperCase(),
  logo: logoMapping[entidad.codigo] || entidad.logoUrl || "",
});

export const useEntidadesFinancieras = () => {
  return useQuery({
    queryKey: ["entidades-financieras"],
    queryFn: async (): Promise<Bank[]> => {
      const response = await fetch("/api/entidades-financieras");
      if (!response.ok) {
        throw new Error("Error al obtener entidades financieras");
      }
      const entidades: EntidadFinanciera[] = await response.json();
      return entidades.map(transformEntidadToBank);
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};