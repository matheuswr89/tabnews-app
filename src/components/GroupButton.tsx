import { useNavigation, useTheme } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { isUserLogged } from "../hooks/isLogged";
import { showAlert } from "../hooks/showAlert";
import { useContent } from "../hooks/useContent";
import { GroupButtonInterface } from "../models/ComponentsModel";
import { deleteOrEditContent, postContent } from "../service/contents";

import Icon from "react-native-vector-icons/FontAwesome5";
import AuthContext from "../context/AuthContext";
import FavoritesContext from "../context/FavoritesContext";
import ReloadContentContext from "../context/ReloadContentContext";
import MarkdownEditor from "./MarkdownEditor";

export default function GroupButton({
  content,
  isEdit,
  setIsEdit,
}: GroupButtonInterface) {
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
  const { toggleReload, isReload } = useContext(ReloadContentContext);
  const { colors } = useTheme();
  const { isLogged } = useContext(AuthContext);
  const { navigate }: any = useNavigation();
  const { deleteContent, saveContent, getContent } = useContent();

  const [isResponder, setIsResponder] = useState(false);
  const [text, setText] = useState(isEdit ? content.body : "");

  const parentId = content.parent_id;
  const url = `${content.owner_username}/${content.slug}`;
  const slug = `-comment-${content.parent_id}`;

  if (!isReload) toggleReload();

  useEffect(() => {
    getContent(slug).then((res) => {
      if (res) {
        setText(res);
      }
    });
  }, []);

  const adicionarPost = () => {
    const data = {
      body: text,
      status: "published",
      parent_id: content.id,
    };
    showAlert({
      title: "Deseja realmente adicionar o comentário?",
      onPressYes: () =>
        postContent(data, toggleReload).then(() => deleteContent(slug)),
    });
  };

  const editaContent = () => {
    const data = {
      status: "published",
      body: text,
      parent_id: parentId,
    };
    showAlert({
      title: "Deseja realmente editar o comentario?",
      onPressYes: () =>
        deleteOrEditContent(url, data, toggleReload).then(() =>
          deleteContent(slug)
        ),
    });
  };

  const clickButtonResponder = () => {
    isUserLogged(isLogged, navigate);
    if (isLogged) {
      setIsResponder(!isResponder);
    }
  };

  const clickCancelarButton = () => {
    showAlert({
      title: "Deseja realmente cancelar?",
      message: "Os dados não salvos serão perdidos.",
      onPressYes: () => {
        setIsResponder(!isResponder);
        if (isEdit === true) setIsEdit(false);
        deleteContent(slug);
      },
    });
  };

  const clickEnviarButton = () => {
    setIsResponder(!isResponder);
    if (isEdit === true) {
      editaContent();
      setIsEdit(false);
    } else {
      adicionarPost();
    }
  };

  const shareContent = () => {
    Share.share({
      message: `https://tabnews.com.br/${url}`,
    });
  };

  const favoritePost = () => {
    toggleFavorite(content);
  };

  const onTextChange = (text) => {
    saveContent(slug, text);
    setText(text);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          zIndex: -10,
        }}
      >
        {(!isResponder || !isEdit) && (
          <View style={styles.container}>
            <TouchableOpacity
              style={[styles.button, { borderColor: "#21c5f7" }]}
              onPress={clickButtonResponder}
            >
              <Text style={styles.textResponder}>Responder</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.iconView}>
          <TouchableOpacity onPress={favoritePost}>
            <Icon
              name="star"
              size={25}
              color={colors.text}
              solid={!!isFavorite(content)}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={shareContent}>
            <Icon name="share-alt" size={25} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {(isResponder || isEdit) && (
          <>
            <View>
              <MarkdownEditor body={text} onChangeText={onTextChange} />
            </View>
            <View style={styles.container}>
              <TouchableOpacity
                style={[styles.button, { borderColor: "#21c5f7" }]}
                onPress={clickEnviarButton}
              >
                <Text style={styles.textResponder}>Enviar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { borderColor: "#f72121" }]}
                onPress={clickCancelarButton}
              >
                <Text style={styles.textExcluir}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 4,
    marginBottom: 4,
  },
  textExcluir: { fontSize: 16, color: "#f72121" },
  textResponder: { fontSize: 16, color: "#21c5f7" },
  textEditar: { fontSize: 16, color: "#48a09b" },
  button: {
    backgroundColor: "transparent",
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 5,
    margin: 2,
    padding: 6,
  },
  iconView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 80,
  },
});
