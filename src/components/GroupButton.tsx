import { useNavigation, useTheme } from "@react-navigation/native";
import { useContext, useRef, useState } from "react";
import { Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { isUserLogged } from "../hooks/isLogged";
import { GroupButtonInterface } from "../models/ComponentsModel";

import Icon from "react-native-vector-icons/FontAwesome5";
import AuthContext from "../context/AuthContext";
import FavoritesContext from "../context/FavoritesContext";
import ReloadContentContext from "../context/ReloadContentContext";
import EditorModal from "./EditorModal";

export default function GroupButton({
  content,
  isEdit,
  setIsEdit,
}: GroupButtonInterface) {
  const { toggleReload, isReload } = useContext(ReloadContentContext);

  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
  const { colors } = useTheme();
  const { isLogged } = useContext(AuthContext);
  const { navigate }: any = useNavigation();

  const textRef = useRef<TouchableOpacity>(null);
  const [isResponder, setIsResponder] = useState(false);

  const url = `${content.owner_username}/${content.slug}`;
  if (!isReload) toggleReload();

  const clickButtonResponder = () => {
    isUserLogged(isLogged, navigate);
    if (isLogged) {
      setIsResponder(!isResponder);
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
          zIndex: -10,
        }}
      >
        {(!isResponder || !isEdit) && (
          <View style={styles.container}>
            <TouchableOpacity
              style={[styles.button, { borderColor: "#21c5f7" }]}
              onPress={clickButtonResponder}
              ref={textRef}
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
          <View style={styles.view}>
            <EditorModal
              content={content}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              isResponder={isResponder}
              setIsResponder={setIsResponder}
            />
          </View>
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
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
