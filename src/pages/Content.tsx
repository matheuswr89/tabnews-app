import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Post from "../components/Post";
import PostComments from "../components/PostComments";
import ReloadContentContext from "../context/ReloadContentContext";
import { getComments } from "../service/coments";
import { getContent } from "../service/contents";

export default function Content(props: NativeStackScreenProps<any, any>) {
  const navigation = useNavigation();
  const { isReload } = useContext(ReloadContentContext);
  const [value, setValue] = useState<any>(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);

  useEffect(() => {
    setComments([]);
    setValue("");
    getContent(setValue, props.route.params?.url, navigation, setLoadingPost);
    getComments(setComments, props.route.params?.url, setLoadingComments);
    props.navigation.setOptions({
      title: props.route.params?.title || value?.title || "Comentário",
    });
  }, [isReload === true]);

  const data: any = [
    <Post value={value} loading={loadingPost} />,
    <PostComments comments={comments} loading={loadingComments} />,
  ];
  return (
    <SafeAreaView style={{ height: "100%" }}>
      <FlatList
        data={data}
        renderItem={({ item }: any) => item}
        listKey={(item, index) => `_key${index.toString()}`}
        keyExtractor={(item, index) => `_key${index.toString()}`}
      />
    </SafeAreaView>
  );
}
