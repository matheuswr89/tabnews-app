import { useRoute, useTheme } from "@react-navigation/native";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardEvent,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { ContentModel } from "../models/Model";
import { NavigationPage } from "../models/PagesModels";
import { getComments } from "../service/coments";
import { getContent } from "../service/contents";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Post from "../components/Post";
import PostComments from "../components/PostComments";
import ReloadContentContext from "../context/ReloadContentContext";

export default function Content({ navigation }: NavigationPage) {
  const { colors } = useTheme();
  const { title, url }: any = useRoute().params;
  const scrollViewRef = useRef<ScrollView>(null);
  const { isReload } = useContext(ReloadContentContext);
  const [value, setValue] = useState<ContentModel>(null);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [comments, setComments] = useState<ContentModel[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingPost, setLoadingPost] = useState<boolean>(false);
  const [loadingComments, setLoadingComments] = useState<boolean>(false);
  const screenHeight = Dimensions.get("window").height;
  let touch = 0;

  useEffect(() => {
    getPostContent();
    navigation.setOptions({
      title: value?.title || title || "Comentário",
    });
  }, [isReload === true]);

  useEffect(() => {
    navigation.setOptions({
      title: value?.title || title || "Comentário",
    });
  }, [value]);

  const getPostContent = async () => {
    setComments([]);
    setValue(null);
    getPost();
  };

  const getPost = async () => {
    if (deleted === true) {
      navigation.goBack();
      return;
    }
    setLoadingPost(true);
    const response = await getContent(url, navigation);
    setLoadingPost(false);
    setValue(response);
    if (response) getCommentsInitial();
  };
  const getCommentsInitial = async () => {
    setLoadingComments(true);
    const responseComments = await getComments(url);
    setComments(responseComments);
    setLoadingComments(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    getPostContent().then(() => setRefreshing(false));
  };

  const handleScroll = (event: any) => {
    event.persist();
    const position = event.nativeEvent.contentOffset.y;
    Keyboard.addListener("keyboardDidShow", (e: KeyboardEvent) => {
      if (touch < 300 && scrollViewRef && scrollViewRef.current) {
        scrollViewRef.current?.scrollTo({
          animated: true,
          x: position + e.endCoordinates.height,
          y: position + e.endCoordinates.height,
        });
      }
    });
  };
  const onTouchStart = (event) => {
    const touchY = event.nativeEvent.pageY;
    touch = screenHeight - touchY;
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ marginTop: 3 }}
      ref={scrollViewRef}
      onScrollEndDrag={handleScroll}
      onTouchStart={onTouchStart}
    >
      <Post value={value} loading={loadingPost} setDeleted={setDeleted} />
      <PostComments
        comments={comments}
        loading={loadingComments}
        loadingPost={loadingPost}
      />
      {!loadingPost && !loadingComments && comments.length === 0 && (
        <View style={{ flex: 1, alignItems: "center", marginVertical: 30 }}>
          <Icon name="message-off" size={30} color={colors.text} />
          <Text style={{ color: colors.text, fontSize: 20 }}>
            Nenhum comentário por aqui!
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
