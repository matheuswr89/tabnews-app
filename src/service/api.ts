import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosRequestConfig } from "axios";
import { AUTH_TOKEN_KEY } from "../hooks/useAuth";

const api: any = axios.create({
  baseURL: "https://www.tabnews.com.br/api/v1",
  //baseURL: "http://192.168.1.105:3000/api/v1",
  timeout: 30000,
});

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  if (config.headers === undefined) {
    config.headers = {};
  }

  const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);

  if (token) {
    config.headers["Set-Cookie"] = "session_id=" + token;
  }

  return config;
});

export default api;
