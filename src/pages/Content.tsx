import { useRoute, useTheme } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
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
  const { isReload } = useContext(ReloadContentContext);
  const { title, url }: any = useRoute().params;

  const [value, setValue] = useState<ContentModel>(null);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [comments, setComments] = useState<ContentModel[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingPost, setLoadingPost] = useState<boolean>(false);
  const [loadingComments, setLoadingComments] = useState<boolean>(false);

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
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ marginTop: 3 }}
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
