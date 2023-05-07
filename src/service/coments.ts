import { Alert } from "react-native";
import api from "./api";

export const getComments = async (url: string) => {
  try {
    const response = await api.get(`/contents/${url}/children`);
    return response.data;
  } catch (err) {
    const response = err.response.data;
    Alert.alert(response.message, response.action);
  }
};
