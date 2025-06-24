import { createContext, useContext } from "react";
import type {
  ApiContextType,
  ApiProviderProps,
  DataType,
} from "../utils/types/ApiContextType";

const ApiContext = createContext<ApiContextType>({} as ApiContextType);

export default function ApiProvider({ children }: ApiProviderProps) {
  function logout() {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/login";
  }
  const data: DataType[] = Array.from({ length: 20 }, (_, i) => ({
    key: (i + 1).toString(),
    name: "Alibek",
    lastName: "Jumaniyazov",
    phone: 886003230 + i,
    email: `alibek00${i + 1}@gmail.com`,
    active: "2025.06.19 17:19",
    subscribe: [Math.random() > 0.5 ? "Aktiv" : "Deaktiv"],
    registerDate: "2025/06/01",
  }));
  const getMethods: ApiContextType = {
    logout,
    data,
  };

  return (
    <ApiContext.Provider value={getMethods}>{children}</ApiContext.Provider>
  );
}
export const useApi = () => useContext(ApiContext);
