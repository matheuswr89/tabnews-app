import { createContext, useEffect, useState } from "react";

interface ReloadContentContext {
  isReload: boolean;
  toggleReload: () => void;
}

const ReloadContentContext = createContext<ReloadContentContext>(
  {} as ReloadContentContext
);

export const ReloadContentProvider = ({ children }) => {
  const [isReload, setIsReload] = useState(false);

  useEffect(() => setIsReload(false), []);

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
