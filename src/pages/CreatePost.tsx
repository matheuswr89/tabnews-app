import { isStringWebLink } from "@matheuswr89/react-native-markdown-editor";
import { useRoute, useTheme } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { showAlert } from "../hooks/showAlert";
import { useContent } from "../hooks/useContent";
import { NavigationPage } from "../models/PagesModels";
import { deleteOrEditContent, postContent } from "../service/contents";
import { global } from "../util/global";

import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import MarkdownEditor from "../components/MarkdownEditor";
import AuthContext from "../context/AuthContext";
import ReloadContentContext from "../context/ReloadContentContext";

export const CreatePost = ({ navigation }: NavigationPage) => {
  const { colors } = useTheme();
  const { toggleReload } = useContext(ReloadContentContext);
  const { mode, content }: any = useRoute().params;
  const { user, logInUser } = useContext(AuthContext);
  const { deleteContent, saveContent, getContent } = useContent();

  const isCreationMode = mode === "creation";

  const [body, setBody] = useState<string>(content?.body || "");
  const [title, setTitle] = useState<string>(content?.title || "");
  const [source, setSource] = useState<string>(content?.source_url || "");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const slug = isCreationMode
    ? `-new${content?.id || ""}`
    : `-edit${content?.id || ""}`;

  useEffect(() => {
    getContent(slug).then((res) => {
      if (res) {
        setBody(res?.body);
        setTitle(res?.title);
        setSource(res?.source);
      }
    });
    navigation.setOptions({
      title: isCreationMode ? "Novo post" : "Editar post",
    });
  }, []);

  const enviarPost = () => {
    if (title.trim().length === 0) {
      Alert.alert("O título é obrigatório!");
      return;
    }

    if (body.trim().length === 0) {
      Alert.alert("O conteúdo do post é obrigatório!");
      return;
    }

    if (source && isStringWebLink(source)) {
      Alert.alert("Forneça uma URL válida!");
      return;
    }

    const payload = {
      body,
      status: "published",
      title,
      ...(source ? { source_url: source } : ""),
    };
    setIsLoading(true);
    if (mode === "creation")
      postContent(payload, toggleReload).then((content) => {
        logInUser();
        deleteContent(slug);
        navigation.replace("Content", {
          url: `${user.username}/${content.data.slug}`,
          title: content.data.title,
        });
      });
    if (mode === "edition") {
      const url = `${content.owner_username}/${content.slug}`;
      deleteOrEditContent(url, payload, toggleReload).then((content) => {
        logInUser();
        deleteContent(slug);
        navigation.navigate("Content", {
          url: `${user.username}/${content.data.slug}`,
          title,
        });
      });
    }
    setIsLoading(false);
  };

  const onChangeText = (text) => {
    const values = {
      body: text,
      source,
      title,
    };
    saveContent(slug, values);
    setBody(text);
  };

  const onChangeTextSource = (text, tipo) => {
    const values = {
      body,
      source: tipo === "source" ? text : source,
      title: tipo === "title" ? text : title,
    };
    saveContent(slug, values);
    if (tipo === "source") setSource(text);
    else setTitle(text);
  };

  const cancelButton = () => {
    showAlert({
      title: "Deseja realmente cancelar?",
      message: "Os dados não salvos serão perdidos.",
      onPressYes: () => {
        deleteContent(slug);
        navigation.goBack();
      },
    });
  };

  return (
    <ScrollView style={{ marginHorizontal: 10 }} showsVerticalScrollIndicator>
      <TextInput
        value={title}
        onChangeText={(e) => onChangeTextSource(e, "title")}
        placeholder={"Título"}
        style={[global.input]}
        placeholderTextColor="#000"
      />
      <View>
        <MarkdownEditor body={body} onChangeText={onChangeText} />
      </View>
      <TextInput
        value={source}
        onChangeText={(e) => onChangeTextSource(e, "source")}
        placeholder={"Fonte (opcional)"}
        style={[global.input]}
        keyboardType={"url"}
        placeholderTextColor="#000"
      />
      <View
        style={{
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={enviarPost}
          style={[global.loginButtonContainer, { width: 120 }]}
        >
          {!isLoading && (
            <Text style={global.loginButton}>
              {isCreationMode ? "Publicar" : "Atualizar"}
            </Text>
          )}
          {isLoading && <ActivityIndicator size="large" />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={cancelButton}
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
    </ScrollView>
  );
};
