import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { CommentsInterface } from "../models/ComponentsModel";
import { ContentModel } from "../models/Model";

import uuid from "react-native-uuid";
import { replaceAll } from "../util/util";
import GroupButton from "./GroupButton";
import MarkdownView from "./MarkdownView";
import OwnerInfo from "./OwnerInfo";
import TabCoin from "./TabCoin";

export default function Comment({ comment }: CommentsInterface) {
  const { colors } = useTheme();
  const [isEdit, setIsEdit] = useState(false);

  return (
    <View
      style={[styles.container, { borderColor: colors.text }]}
      key={`${uuid.v4()}${comment.slug}${comment.id}}`}
    >
      <TabCoin data={comment} color={colors.card} />
      <OwnerInfo data={comment} setIsEdit={setIsEdit} />
      <MarkdownView
        body={comment.body.replace(/(<http[^>]*.)/gm, replaceAll)}
      />
      <GroupButton content={comment} isEdit={isEdit} setIsEdit={setIsEdit} />
      {comment.children &&
        comment.children.map((reply: ContentModel) => (
          <Comment comment={reply} key={`comment${uuid.v4()}${comment.slug}`} />
        ))}
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
    paddingLeft: 5,
    width: "95%",
  },
  commentContainer: {
    marginBottom: 16,
    padding: 8,
    borderRadius: 5,
  },
});
