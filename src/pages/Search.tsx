import { Button } from "@rneui/base";
import axios from "axios";
import { useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import uuid from "react-native-uuid";
import EmptyList from "../components/EmptyList";
import ListItem from "../components/ListItem";
import SwitchComponent from "../components/SearchBar";
import { search } from "../service/search";
import { parseSearch } from "../util/parseSearch";

export default function Search() {
  const [value, setValue]: any = useState([]);
  const [nextPageLink, setNextPageLink] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingContent, setLoadingContent] = useState<boolean>(false);

  const nextPageSearch = async () => {
    setLoading(true);
    const response = await axios.get(`https://www.google.com/${nextPageLink}`);
    parseSearch(response, setNextPageLink, setValue);
    setLoading(false);
  };

  return (
    <ScrollView>
      <SwitchComponent
        searchFunc={search}
        setLoadingContent={setLoadingContent}
        setValue={setValue}
        setNextPageLink={setNextPageLink}
      />
      {loadingContent && <ActivityIndicator size="large" />}
      {!loadingContent &&
        value.map((v: any, index: number) => (
          <View key={v?.title + uuid.v4()}>
            <ListItem post={v} index={index} />
          </View>
        ))}
      {!loadingContent && value.length === 0 && <EmptyList />}
      {nextPageLink && value.length > 0 && (
        <Button
          onPress={nextPageSearch}
          title="Carregar mais..."
          loading={loading}
          buttonStyle={global.button}
          titleStyle={global.buttonText}
        />
      )}
    </ScrollView>
  );
}
