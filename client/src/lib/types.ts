export interface UserData {
  nombres: string;
  apellidos: string;
  dni: string;
  celular: string;
  email: string;
  fechaNacimiento?: string;
  password?: string;
}

export interface SelectedProduct {
  bank: string;
  bankCode: string;
  product: string;
  productType: "credit" | "debit" | "apps" | "wallet";
}

export interface Bank {
  id: number;
  codigo: string;
  nombre: string;
  logoUrl: string | null;
  activo: boolean;
  // Propiedades de compatibilidad con el código existente
  code: string;
  name: string;
  color: string;
  shortName: string;
  logo: string;
}

export type Screen = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
