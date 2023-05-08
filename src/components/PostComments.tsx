import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { global } from "../util/global";
import CommentTree from "./CommentsTree";

export default function PostComments({ comments, loading, loadingPost }) {
  const { colors } = useTheme();
  const [numComments, setNumComments] = useState(5);
  const [loadingButton, setLoadingButton] = useState(false);

  const getMoreComments = () => {
    setLoadingButton(true);
    setNumComments(numComments + 5);
    setLoadingButton(false);
  };

  return (
    <View>
      {!loadingPost && !loading && comments.length > 0 && (
        <CommentTree
          comments={comments.slice(0, numComments)}
          card={colors.card}
        />
      )}
      {!loadingPost &&
        !loading &&
        comments.length > 5 &&
        numComments <= comments.length && (
          <TouchableOpacity
            onPress={getMoreComments}
            style={[
              global.loginButtonContainer,
              { marginTop: -20, width: "90%", marginHorizontal: 20 },
            ]}
          >
            {!loadingButton && (
              <Text style={global.loginButton}>Carregar mais comentários</Text>
            )}
            {loadingButton && <ActivityIndicator size="large" />}
          </TouchableOpacity>
        )}
      {!loadingPost && loading && <ActivityIndicator size="large" />}
    </View>
  );
}
