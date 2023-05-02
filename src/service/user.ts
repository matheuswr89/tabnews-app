import { Alert } from "react-native";
import api from "./api";

export const getUser = async (user: string) => {
  try {
    const response = await api.get(`/users/${user}`);
    return response;
  } catch (err) {
    const response = err.response.data;
    Alert.alert(response.message, response.action);
  }
};
