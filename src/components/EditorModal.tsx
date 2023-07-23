import { useTheme } from "@react-navigation/native";
import { useContext, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import ReloadContentContext from "../context/ReloadContentContext";
import { showAlert } from "../hooks/showAlert";
import { useContent } from "../hooks/useContent";
import { deleteOrEditContent, postContent } from "../service/contents";
import { global } from "../util/global";
import MarkdownEditor from "./MarkdownEditor";

export default function EditorModal({
  content,
  isEdit,
  setIsEdit,
  isResponder,
  setIsResponder,
}) {
  const { deleteContent, saveContent, getContent } = useContent();
  const { toggleReload } = useContext(ReloadContentContext);
  const [scrollOffset, setscrollOffset] = useState(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [text, setText] = useState(isEdit ? content.body : "");
  const [visible, setIsVisible] = useState(true);

  const { colors } = useTheme();
  const parentId = content.parent_id;
  const url = `${content.owner_username}/${content.slug}`;
  const slug = `-comment-${content.parent_id}`;

  useEffect(() => {
    getContent(slug).then((res) => {
      if (res) {
        setText(res);
      }
    });
  }, []);

  const onTextChange = (text) => {
    saveContent(slug, text);
    setText(text);
  };

  const handleOnScroll = (event) => {
    setscrollOffset(event.nativeEvent.contentOffset.y);
  };
  const handleScrollTo = (p) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };
  const adicionarPost = () => {
    const data = {
      body: text,
      status: "published",
      parent_id: content.id,
    };
    showAlert({
      title: "Deseja realmente adicionar o comentário?",
      onPressYes: () =>
        postContent(data, toggleReload).then(() => {
          deleteContent(slug);
          setIsResponder(!isResponder);
        }),
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
        deleteOrEditContent(url, data, toggleReload).then(() => {
          deleteContent(slug);
          setIsResponder(!isResponder);
          setIsEdit(false);
        }),
    });
  };

  const clickEnviarButton = () => {
    if (isEdit) {
      editaContent();
    } else {
      adicionarPost();
    }
  };

  const close = () => {
    setIsVisible(!visible);
    setIsResponder(false);
  };

  return (
    <Modal
      testID={"modal"}
      isVisible={visible}
      onSwipeComplete={close}
      swipeDirection={["down"]}
      scrollTo={handleScrollTo}
      scrollOffset={scrollOffset}
      scrollOffsetMax={400 - 300}
      propagateSwipe={true}
      style={styles.modal}
      avoidKeyboard
      hardwareAccelerated
      onBackButtonPress={close}
      onBackdropPress={close}
    >
      <View style={[styles.scrollableModal, { backgroundColor: colors.card }]}>
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleOnScroll}
          scrollEventThrottle={16}
        >
          <View style={{ alignItems: "center" }}>
            <Icon name="window-minimize" size={25} color={colors.text} />
          </View>
          <View style={styles.scrollableModalContent}>
            <MarkdownEditor body={text} onChangeText={onTextChange} />
            <View
              style={{
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={clickEnviarButton}
                style={[global.loginButtonContainer, { width: 120 }]}
              >
                <Text style={global.loginButton}>
                  {!isEdit ? "Publicar" : "Atualizar"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={close}
                style={[
                  global.loginButtonContainer,
                  { backgroundColor: "transparent", marginRight: 20 },
                ]}
              >
                <Text style={[global.loginButton, { color: colors.text }]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  scrollableModal: {
    height: "90%",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  scrollableModalContent: {
    marginVertical: 20,
  },
  scrollableModalText1: {
    fontSize: 20,
    color: "white",
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: "#A9DCD3",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollableModalText2: {
    fontSize: 20,
    color: "white",
  },
});
