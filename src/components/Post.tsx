import { useNavigation, useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { PostInterface } from "../models/ComponentsModel";
import { ContentModel } from "../models/Model";
import { getParentContent } from "../service/contents";

import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";
import GroupButton from "./GroupButton";
import MarkdownView from "./MarkdownView";
import OwnerInfo from "./OwnerInfo";
import TabCoin from "./TabCoin";

export default function Post({ value, loading, setDeleted }: PostInterface) {
  const [parent, setParent] = useState<ContentModel>(null);

  const { colors } = useTheme();
  const { push }: any = useNavigation();

  const openLink = () => {
    Linking.openURL(value.source_url);
  };

  useEffect(() => {
    if (value?.parent_id) {
      getParentContent(`${value.owner_username}/${value.slug}`).then((res) => {
        setParent(res);
      });
    }
  }, [value]);

  const redirectPost = () => {
    push("Content", {
      url: `${parent.owner_username}/${parent.slug}`,
      title: parent.title,
    });
  };

  return (
    <>
      {loading && <ActivityIndicator size="large" />}
      {!loading && value && (
        <View style={styles.container}>
          <View style={styles.tabcoin}>
            <TabCoin data={value} color={colors.background} />
          </View>
          <View style={styles.post}>
            {parent && (
              <View>
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 16,
                  }}
                  numberOfLines={1}
                >
                  <Icon name="comment-alt" size={15} /> Em resposta a{" "}
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 16,
                    }}
                    onPress={redirectPost}
                  >
                    {parent?.title || parent?.body}
                  </Text>
                </Text>
              </View>
            )}
            <OwnerInfo data={value} setDeleted={setDeleted} />
            {value.title && (
              <Text
                style={{
                  color: colors.text,
                  fontSize: 24,
                  fontWeight: "900",
                  borderBottomColor: colors.text,
                  borderBottomWidth: 2,
                  zIndex: -2,
                }}
                selectable
              >
                {value.title}
              </Text>
            )}
            <MarkdownView body={value.body} />
            {value.source_url && (
              <View style={[styles.sourceUrl, { borderTopColor: colors.text }]}>
                <Icon name="link" size={15} color={colors.text} />
                <Text style={[styles.sourceUrlButton, { color: colors.text }]}>
                  Fonte:{" "}
                </Text>
                <TouchableOpacity onPress={openLink}>
                  <Text
                    style={[
                      styles.sourceUrlButton,
                      { color: "rgb(88, 166, 255)" },
                    ]}
                  >
                    {value.source_url}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <GroupButton content={value} />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 5,
    flexDirection: "row",
    top: 6,
  },
  post: {
    marginLeft: 10,
    width: "88%",
  },
  tabcoin: {
    marginLeft: 24,
    height: "100%",
  },
  sourceUrl: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderTopWidth: 2,
  },
  sourceUrlButton: {
    marginLeft: 5,
    fontSize: 15,
  },
});
