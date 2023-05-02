import { Alert } from "react-native";
import api from "./api";

export const getContent = async (
  setValue: any,
  url: string,
  navigation: any,
  setLoadingPost: any
) => {
  setLoadingPost(true);
  try {
    const response = await api.get(`/contents/${url}`);

    setValue(response.data);
  } catch (err) {
    navigation.goBack();

    const response = err.response.data;
    Alert.alert(response.message, response.action);
  }
  setLoadingPost(false);
};

export const getParentContent = async (url: string) => {
  try {
    const response = await api.get(`/contents/${url}/parent`);
    return response.data;
  } catch (err) {
    const response = err.response.data;
    Alert.alert(response.message, response.action);
  }
};

export const deleteOrEditContent = async (
  url: string,
  content: any,
  toggleReload: any
) => {
  try {
    const response = await api.patch(`/contents/${url}`, content);
    alert(
      `Conteúdo ${
        content.status === "deleted" ? "excluído" : "alterado"
      } com sucesso!`
    );
    toggleReload();
    return response;
  } catch (err) {
    const response = err.response.data;
    Alert.alert(response.message, response.action);
  }
};

export const postContent = async (content: any, toggleReload: any) => {
  try {
    const response = await api.post(`/contents/`, content);
    alert(`Conteúdo adicionado com sucesso!`);
    toggleReload();
    return response;
  } catch (err) {
    const response = err.response.data;
    Alert.alert(response.message, response.action);
  }
};

export const giveVote = async (
  username: string,
  postSlug: string,
  type: string
) => {
  try {
    await api.post(`/contents/${username}/${postSlug}/tabcoins`, {
      transaction_type: type,
    });
  } catch (err) {
    const response = err.response.data;
    Alert.alert(response.message, response.action);
  }
};

export const getUserContent = async (
  user: string,
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
    const response = await api.get(
      `/contents/${user}?page=${page}&per_page=${perPage}`
    );
    return response;
  } catch (err) {
    const response = err.response.data;
    Alert.alert(response.message, response.action);
  }
};
