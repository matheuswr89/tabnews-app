import { useNavigation } from "@react-navigation/native";
import FlashList from "@shopify/flash-list/dist/FlashList";
import axios from "axios";
import { useCallback, useState } from "react";
import { ActivityIndicator, RefreshControl, View } from "react-native";
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
  const { push }: any = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

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
      <SwitchComponent
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
          renderItem={({ item, index }) => (
            <ListItem index={index} post={item} push={push} />
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
