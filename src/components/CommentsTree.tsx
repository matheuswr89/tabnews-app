import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import uuid from "react-native-uuid";
import Comment from "./Comments";

export default function CommentTree({ comments }: any) {
  const { colors } = useTheme();
  return (
    <View style={styles.container} key={`CommentTree${uuid.v4()}}`}>
      {comments?.map((comment: any) => (
        <View
          style={[styles.commentContainer, { backgroundColor: colors.card }]}
          key={`View${comment.id}${uuid.v4()}}`}
        >
          <Comment comment={comment} />
        </View>
      ))}
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 24,
    marginBottom: 40,
    flex: 1,
    height: "100%",
  },
  commentContainer: {
    marginBottom: 16,
    padding: 8,
    borderRadius: 5,
  },
});
