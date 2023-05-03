import axios from "axios";
import { Alert } from "react-native";
import { parseSearch } from "../util/parseSearch";

export const search = async (
  searchValue: string,
  setLoadingContent: any,
  setValue: any,
  setNextPageLink: any
) => {
  if (searchValue.length > 0) {
    setLoadingContent(true);
    try {
      const s = searchValue.split(" ").join("+");
      const response = await axios.get(
        `https://www.google.com/search?num=150&q=site:tabnews.com.br+intitle:${s}&spell=1&sa=X`
      );
      parseSearch(response, setNextPageLink, setValue);
      setLoadingContent(false);
    } catch (err) {
      Alert.alert(
        "Erro",
        "Não foi possivel completar a pesquisa, tente novamente mais tarde!"
      );
    }
    setLoadingContent(false);
  }
};
