import { createContext, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { AuthContextProps } from "../models/ContextModel";
import { UserModel } from "../models/Model";

import api from "../service/api";

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }) => {
  const {
    saveToken,
    deleteToken,
    saveUser,
    deleteUser,
    deleteExpireAt,
    saveExpireAt,
    getExpireAt,
    getUser,
    deleteAll,
  } = useAuth();

  const [user, setUser] = useState<UserModel>(null);

  const isTokenExpired = async () => {
    const expireAt = await getExpireAt();
    if (expireAt) {
      const date: any = new Date();
      const dateExpireAt: any = new Date(expireAt);
      const diffInMs = dateExpireAt - date;

      if (diffInMs > 0) {
        setUser(await getUser());
      }
      return !(diffInMs > 0);
    }
    return undefined;
  };

  const signIn = async (email: string, password: string) => {
    try {
      const res = await api.post("/sessions", { email, password });

      if (res.status !== 201) {
        return false;
      }

      const userData = await api.get(`/user`);

      await saveExpireAt(res.data.expires_at);
      await saveToken(res.data.token);
      await saveUser(userData.data);
      setUser(userData.data);
      return true;
    } catch (e) {
      return false;
    }
  };

  const signOut = async () => {
    //await api.delete("/sessions");
    await deleteToken();
    await deleteUser();
    await deleteExpireAt();
    setUser(null);
  };

  const signUp = async (username: string, email: string, password: string) => {
    await api.post("/users", { username, email, password });
  };

  const logInUser = async () => {
    const userData = await api.get(`/user`);
    setUser(userData.data);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged: !!user?.id,
        signIn,
        signOut,
        signUp,
        logInUser,
        isTokenExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
