import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, View } from "react-native";
import ListItem from "../components/ListItem";
import FavoritesContext from "../context/FavoritesContext";
import { getTopics } from "../service/topics";

export default function List({ strategy }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue]: any = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const { push }: any = useNavigation();
  const { favorites } = useContext(FavoritesContext);

  const perPage = 15;

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    if (strategy === "favorites") {
      setValue(favorites);
      return;
    }
    setLoading(true);

    const page =
      value.length === 0 ? 1 : Math.floor(value.length / perPage) + 1;
    const contents = await getTopics(strategy, page, perPage);
    setValue([...value, ...contents]);
    setLoading(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPosts().then(() => {
      setRefreshing(false);
    });
  }, []);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <FlashList
        keyExtractor={(item, index) => {
          return item + index.toString();
        }}
        renderItem={({ item, index }) => {
          return <ListItem index={index} post={item} push={push} />;
        }}
        data={value}
        estimatedItemSize={200}
        onEndReached={value.length > 10 ? loadPosts : null}
        onEndReachedThreshold={0.2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={() =>
          strategy !== "favorites" &&
          loading &&
          !refreshing && <ActivityIndicator size={"large"} />
        }
      />
    </View>
  );
}
