import { useCallback, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import uuid from "react-native-uuid";
import EmptyList from "../components/EmptyList";
import ListItem from "../components/ListItem";
import FavoritesContext from "../context/FavoritesContext";
import { getTopics } from "../service/topics";

export default function List({ strategy }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue]: any = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const perPage = 20;

  const { favorites } = useContext(FavoritesContext);

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
    <View style={{ marginVertical: 8, flex: 1 }} key={`_list${uuid.v4()}`}>
      <FlatList
        refreshControl={
          strategy !== "favorites" && (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          )
        }
        data={value}
        keyExtractor={(item) => `list${item.id}${uuid.v4()}`}
        renderItem={({ item, index }) => <ListItem index={index} post={item} />}
        onEndReached={value.length > 9 ? loadPosts : null}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          strategy !== "favorites" && loading && !refreshing ? (
            <ActivityIndicator size={"large"} />
          ) : null
        }
        ListEmptyComponent={() => <EmptyList />}
      />
    </View>
  );
}
