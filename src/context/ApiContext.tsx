import { createContext } from "react";
import type {
  ApiContextType,
  ApiProviderProps,
} from "../utils/types/ApiContextType";

const ApiContext = createContext<ApiContextType>({} as ApiContextType);

export default function ApiProvider({ children }: ApiProviderProps) {
  const getMethods: ApiContextType = {};
  return (
    <ApiContext.Provider value={getMethods}>{children}</ApiContext.Provider>
  );
}
