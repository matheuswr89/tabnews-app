import { createContext, useState } from "react";
import { ReloadContentContextProps } from "../models/ContextModel";

const ReloadContentContext = createContext<ReloadContentContextProps>(
  {} as ReloadContentContextProps
);

export const ReloadContentProvider = ({ children }) => {
  const [isReload, setIsReload] = useState<boolean>(false);

  const toggleReload = () => {
    setIsReload(!isReload);
  };

  return (
    <ReloadContentContext.Provider
      value={{
        isReload,
        toggleReload,
      }}
    >
      {children}
    </ReloadContentContext.Provider>
  );
};
export default ReloadContentContext;
