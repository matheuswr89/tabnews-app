import { useCallback, useState } from "react";
import { ActivityIndicator, RefreshControl, View } from "react-native";
import { ContentModel } from "../models/Model";
import { search } from "../service/search";
import { parseSearch } from "../util/parseSearch";

import FlashList from "@shopify/flash-list/dist/FlashList";
import axios from "axios";
import EmptyList from "../components/EmptyList";
import ListItem from "../components/ListItem";
import SearchBar from "../components/SearchBar";

export default function Search() {
  const [value, setValue]: any = useState<ContentModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [nextPageLink, setNextPageLink] = useState<string | undefined>("");
  const [loadingContent, setLoadingContent] = useState<boolean>(false);

  const nextPageSearch = async () => {
    setLoading(true);
    const response = await axios.get(`https://www.google.com/${nextPageLink}`);
    parseSearch(response, setNextPageLink, setValue);
    setLoading(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    nextPageSearch().then(() => {
      setRefreshing(false);
    });
  }, []);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <SearchBar
        searchFunc={search}
        setLoadingContent={setLoadingContent}
        setValue={setValue}
        setNextPageLink={setNextPageLink}
      />
      {loadingContent && <ActivityIndicator size="large" />}
      {!loadingContent && (
        <FlashList
          keyExtractor={(item, index) => {
            return item + index.toString();
          }}
          renderItem={({ item, index }: any) => (
            <ListItem index={index} post={item} />
          )}
          data={value}
          estimatedItemSize={1000}
          onEndReached={
            nextPageLink && value.length > 10 ? nextPageSearch : null
          }
          onEndReachedThreshold={0.2}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={() =>
            loading && !refreshing ? <ActivityIndicator size={"large"} /> : null
          }
        />
      )}
      {!loadingContent && value.length === 0 && <EmptyList />}
    </View>
  );
}
