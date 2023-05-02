import { Alert } from "react-native";
import api from "./api";

export const getComments = async (setValue: any, url: string, setLoading) => {
  setLoading(true);
  try {
    const response = await api.get(`/contents/${url}/children`);
    setValue([]);
    for (let i of response.data) {
      setValue((oldMessages: any) => [
        ...oldMessages,
        {
          ...i,
          url: `${i.owner_username}/${i.slug}`,
        },
      ]);
    }
  } catch (err) {
    const response = err.response.data;
    Alert.alert(response.message, response.action);
  }
  setLoading(false);
};
