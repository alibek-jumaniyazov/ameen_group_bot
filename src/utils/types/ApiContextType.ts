import type { ReactNode } from "react";

export interface ApiContextType {
  logout: () => void;
}

export interface ApiProviderProps {
  children: ReactNode;
}
