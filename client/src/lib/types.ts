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
  productType: 'credit' | 'debit' | 'apps' | 'wallet';
}

export interface Bank {
  code: string;
  name: string;
  color: string;
  shortName: string;
}

export type Screen = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
