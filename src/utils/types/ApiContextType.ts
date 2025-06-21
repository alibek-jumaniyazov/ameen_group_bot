import type { ReactNode } from "react";

export interface DataType {
  key: string;
  name: string;
  lastName: string;
  phone: number;
  email: string;
  active: string;
  subscribe: string[];
}
export interface ApiContextType {
  logout: () => void;
  data: DataType[];
}

export interface ApiProviderProps {
  children: ReactNode;
}
