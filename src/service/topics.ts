import { Alert } from "react-native";
import api from "./api";

export const getTopics = async (
  topic: string,
  page: number,
  perPage: number
) => {
  try {
    if (!perPage) {
      perPage = 10;
    }

    if (!page) {
      page = 1;
    }
    const { data } = await api.get(
      `/contents?strategy=${topic}&page=${page}&per_page=${perPage}`
    );
    return data;
  } catch (err) {
    const response = err.response.data;
    Alert.alert(response.message, response.action);
  }
};
