import { useNavigation, useTheme } from "@react-navigation/native";
import { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Menu, MenuItem } from "react-native-material-menu";
import { showAlert } from "../hooks/showAlert";
import { ActionsCommentsInterface } from "../models/ComponentsModel";
import { deleteOrEditContent } from "../service/contents";

import Icon from "react-native-vector-icons/AntDesign";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import IconOcticons from "react-native-vector-icons/Octicons";
import ReloadContentContext from "../context/ReloadContentContext";

export default function ActionsComments({
  post,
  setIsEdit,
  setDeleted,
}: ActionsCommentsInterface) {
  const { colors } = useTheme();
  const { toggleReload } = useContext(ReloadContentContext);
  const navigation: any = useNavigation();

  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
  const url = `${post.owner_username}/${post.slug}`;

  const deletePost = () => {
    showAlert({
      title: `Deseja realmente excluir o ${
        post.parent_id ? "comentario" : "post"
      }?`,
      message: "Essa ação é irreversível!",
      onPressYes: () =>
        deleteOrEditContent(url, { status: "deleted" }, toggleReload),
    });
    setDeleted(true);
  };

  const editPost = () => {
    if (post.parent_id) setIsEdit(true);
    else navigation.navigate("CreatePost", { mode: "edition", content: post });
  };

  return (
    <View style={styles({ colors }).container}>
      <Menu
        style={{ backgroundColor: colors.border }}
        visible={visible}
        anchor={
          <Icon
            name="ellipsis1"
            size={25}
            color={colors.text}
            onPress={showMenu}
            style={{
              borderWidth: 2,
              borderColor: colors.border,
              paddingLeft: 3,
              paddingTop: 3,
              borderRadius: 9,
            }}
          />
        }
        onRequestClose={hideMenu}
      >
        <MenuItem
          onPress={() => {
            hideMenu();
            editPost();
          }}
        >
          <Text style={[styles({ colors }).editText, { lineHeight: 22 }]}>
            <IconMaterialIcons name="edit" size={19} /> Editar
          </Text>
        </MenuItem>

        <MenuItem
          onPress={() => {
            hideMenu();
            deletePost();
          }}
        >
          <Text style={styles({ colors }).deleteText}>
            <IconOcticons name="trash" size={19} /> Excluir
          </Text>
        </MenuItem>
      </Menu>
    </View>
  );
}

export const styles = StyleSheet.create<any>((props) => {
  return {
    container: {
      alignItems: "flex-end",
    },
    deleteText: {
      color: "#c75656",
      fontSize: 19,
      fontWeight: "700",
    },
    editText: { color: props.colors.text, fontSize: 19, fontWeight: "700" },
  };
});
