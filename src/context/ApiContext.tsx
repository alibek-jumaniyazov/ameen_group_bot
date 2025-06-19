import { createContext, useContext } from "react";
import type {
  ApiContextType,
  ApiProviderProps,
} from "../utils/types/ApiContextType";

const ApiContext = createContext<ApiContextType>({} as ApiContextType);

export default function ApiProvider({ children }: ApiProviderProps) {
  function logout() {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/login";
  }

  const getMethods: ApiContextType = {
    logout,
  };

  return (
    <ApiContext.Provider value={getMethods}>{children}</ApiContext.Provider>
  );
}
export const useApi = () => useContext(ApiContext);