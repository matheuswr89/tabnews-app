import { MarkdownEditor } from "@matheuswr89/react-native-markdown-editor";
import { Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useNavigation, useTheme } from "@react-navigation/native";
import { useContext, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import AuthContext from "../context/AuthContext";
import FavoritesContext from "../context/FavoritesContext";
import { isUserLogged } from "../hooks/isLogged";
import { showAlert } from "../hooks/showAlert";
import { deleteOrEditContent, postContent } from "../service/contents";
import { markdownStyles } from "../util/global";

export default function GroupButton({ content }) {
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
  //  const { toggleReload, isReload } = useContext(ReloadContentContext);
  const { user } = useContext(AuthContext);
  const { colors } = useTheme();
  const { isLogged } = useContext(AuthContext);
  const { navigate }: any = useNavigation();

  const [isResponder, setIsResponder] = useState(false);
  const [text, setText] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const parentId = content.parent_id;
  const url = `${content.owner_username}/${content.slug}`;
  const isCommentUser = content.owner_id === user?.id;

  //if (!isReload) toggleReload();

  const adicionarPost = () => {
    const data = {
      body: text,
      status: "published",
      parent_id: content.id,
    };
    showAlert({
      title: "Deseja realmente adicionar o comentário?",
      onPressYes: () => postContent(data, () => {}),
    });
  };

  const excluirPost = () => {
    showAlert({
      title: `Deseja realmente excluir o ${parentId ? "comentario" : "post"}?`,
      message: "Essa ação é irreversível!",
      onPressYes: () =>
        deleteOrEditContent(url, { status: "deleted" }, () => {}),
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
      onPressYes: () => deleteOrEditContent(url, data, () => {}),
    });
  };

  const clickButtonResponder = () => {
    isUserLogged(isLogged, navigate);
    if (isLogged && !isResponder) {
      setText("");
      setIsResponder(!isResponder);
    }
  };

  const clickEditButton = () => {
    if (parentId) {
      setIsEdit(true);
      setIsResponder(!isResponder);
      setText(content.body);
    } else {
      navigate("CreatePost", { mode: "edition", content });
    }
  };

  const clickCancelarButton = () => {
    setIsResponder(!isResponder);
    if (isEdit === true) setIsEdit(false);
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

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {!isResponder && (
          <View style={styles.container}>
            <TouchableOpacity
              style={[styles.button, { borderColor: "#21c5f7" }]}
              onPress={clickButtonResponder}
            >
              <Text style={styles.textResponder}>Responder</Text>
            </TouchableOpacity>
            {isCommentUser && (
              <>
                <TouchableOpacity
                  style={[styles.button, { borderColor: "#f72121" }]}
                  onPress={excluirPost}
                >
                  <Text style={styles.textExcluir}>Excluir</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { borderColor: "#48a09b" }]}
                  onPress={clickEditButton}
                >
                  <Text style={styles.textEditar}>Editar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: 80,
          }}
        >
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
        {isResponder && (
          <>
            <MarkdownEditor
              markdown={text}
              onMarkdownChange={setText}
              placeholder="Escreva aqui..."
              placeholderTextColor={colors.text}
              textInputStyles={markdownStyles({ colors }).textInputStyles}
              buttonContainerStyles={
                markdownStyles({ colors }).buttonContainerStyles
              }
              buttonStyles={markdownStyles({ colors }).buttonStyles}
            />
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
});
