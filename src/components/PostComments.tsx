import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { global } from "../util/global";
import CommentTree from "./CommentsTree";

export default function PostComments({ comments, loading }) {
  const { colors } = useTheme();
  const [numComments, setNumComments] = useState(5);

  const getMoreComments = () => {
    setNumComments(numComments + 5);
    console.log(comments.slice(0, numComments));
  };

  return (
    <View>
      {!loading && comments.length > 0 && (
        <CommentTree
          comments={comments.slice(0, numComments)}
          card={colors.card}
        />
      )}
      {!loading && comments.length === 0 && (
        <View style={{ flex: 1, alignItems: "center", marginVertical: 30 }}>
          <Icon name="message-off" size={30} color={colors.text} />
          <Text style={{ color: colors.text, fontSize: 20 }}>
            Nenhum comentário por aqui!
          </Text>
        </View>
      )}
      {comments.length > 10 && numComments <= comments.length && (
        <TouchableOpacity
          onPress={getMoreComments}
          style={[
            global.loginButtonContainer,
            { marginTop: -20, width: "90%", marginHorizontal: 20 },
          ]}
        >
          <Text style={global.loginButton}>Carregar mais comentários</Text>
        </TouchableOpacity>
      )}
      {loading && <ActivityIndicator size="large" />}
    </View>
  );
}
