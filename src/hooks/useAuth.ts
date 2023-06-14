import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTH_TOKEN_KEY = "@tabnews-app:AUTH_TOKEN_KEY";
const AUTH_USER_KEY = "@tabnews-app:AUTH_USER_KEY";
const EXPIRE_AT_KEY = "@tabnews-app:EXPIRE_AT_KEY";

export const useAuth = () => {
  const saveToken = async (token: string) => {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  };

  const deleteToken = async () => {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  };

  const getToken = async () => {
    return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  };

  const saveExpireAt = async (token: string) => {
    await AsyncStorage.setItem(EXPIRE_AT_KEY, token);
  };

  const deleteExpireAt = async () => {
    await AsyncStorage.removeItem(EXPIRE_AT_KEY);
  };

  const getExpireAt = async () => {
    return await AsyncStorage.getItem(EXPIRE_AT_KEY);
  };

  const saveUser = async (user: any) => {
    const userString = JSON.stringify(user);
    await AsyncStorage.setItem(AUTH_USER_KEY, userString);
  };

  const getUser = async () => {
    const userString = await AsyncStorage.getItem(AUTH_USER_KEY);

    return JSON.parse(userString);
  };

  const deleteUser = async () => {
    await AsyncStorage.removeItem(AUTH_USER_KEY);
  };

  const deleteAll = async () => {
    await AsyncStorage.removeItem(AUTH_USER_KEY);
    await AsyncStorage.removeItem(EXPIRE_AT_KEY);
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  };

  return {
    deleteToken,
    getToken,
    saveToken,
    saveUser,
    getUser,
    deleteUser,
    saveExpireAt,
    deleteExpireAt,
    getExpireAt,
    deleteAll,
  };
};
