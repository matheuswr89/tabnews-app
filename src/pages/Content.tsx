import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Post from "../components/Post";
import PostComments from "../components/PostComments";
import ReloadContentContext from "../context/ReloadContentContext";
import { getComments } from "../service/coments";
import { getContent } from "../service/contents";

export default function Content(props: NativeStackScreenProps<any, any>) {
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { isReload } = useContext(ReloadContentContext);
  const [value, setValue] = useState<any>(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    getPostContent();
    props.navigation.setOptions({
      title: props.route.params?.title || value?.title || "Comentário",
    });
  }, [isReload === true]);

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
    const response = await getContent(props.route.params?.url, navigation);
    setLoadingPost(false);
    setValue(response);
    if (response) getCommentsInitial();
  };
  const getCommentsInitial = async () => {
    setLoadingComments(true);
    const responseComments = await getComments(props.route.params?.url);
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
