import { FlashList } from "@shopify/flash-list";
import { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, View } from "react-native";
import { ContentModel } from "../models/Model";
import { ListModel } from "../models/PagesModels";
import { getContent } from "../service/contents";
import { getTopics } from "../service/topics";

import EmptyList from "../components/EmptyList";
import ListItem from "../components/ListItem";
import FavoritesContext from "../context/FavoritesContext";

export default function List({ strategy }: ListModel) {
  const [page, setPage] = useState<number>(1);
  const [value, setValue]: any = useState<ContentModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const { favorites, replaceFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    loadPosts();
  }, [strategy !== "favorites"]);

  useEffect(() => {
    loadPosts();
  }, [favorites]);

  const loadPosts = async () => {
    if (strategy !== "favorites") {
      setLoading(true);
      const contents = await getTopics(strategy, page);
      setValue([...value, ...contents]);
      setLoading(false);
      setPage(page + 1);
    }
  };

  const updateFavorites = async () => {
    for (let i = 0; i < favorites.length; i++) {
      const response = await getContent(
        `${favorites[i].owner_username}/${favorites[i].slug}`
      );
      replaceFavorite(favorites[i], response);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (strategy === "favorites") {
      updateFavorites().then(() => {
        setRefreshing(false);
      });
    } else {
      setPage(1);
      setValue([]);
      loadPosts().then(() => {
        setRefreshing(false);
      });
    }
  }, []);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <FlashList
        keyExtractor={(item, index) => {
          return item + index.toString();
        }}
        renderItem={({ item, index }: any) => {
          return <ListItem index={index} post={item} />;
        }}
        data={strategy === "favorites" ? favorites : value}
        estimatedItemSize={200}
        onEndReached={value.length >= 30 ? loadPosts : null}
        onEndReachedThreshold={0.2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={EmptyList}
        ListFooterComponent={() =>
          strategy !== "favorites" &&
          loading &&
          !refreshing && <ActivityIndicator size={"large"} />
        }
      />
    </View>
  );
}
