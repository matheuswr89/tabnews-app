import {
  isStringWebLink,
  MarkdownEditor,
} from "@matheuswr89/react-native-markdown-editor";

import { useRoute, useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AuthContext from "../context/AuthContext";
import ReloadContentContext from "../context/ReloadContentContext";
import { showAlert } from "../hooks/showAlert";
import { useContent } from "../hooks/useContent";
import { deleteOrEditContent, postContent } from "../service/contents";
import { global, markdownStyles } from "../util/global";

export const CreatePost = ({
  navigation,
}: NativeStackScreenProps<any, any>) => {
  const { colors } = useTheme();
  const { mode, content }: any = useRoute().params;
  const [isLoading, setIsLoading] = useState(false);
  const isCreationMode = mode === "creation";
  const { toggleReload } = useContext(ReloadContentContext);
  const { user, logInUser } = useContext(AuthContext);
  const { deleteContent, saveContent, getContent } = useContent();

  const [title, setTitle]: any = useState(content?.title || "");
  const [body, setBody]: any = useState(content?.body || "");
  const [source, setSource]: any = useState(content?.source_url || "");

  const slug = isCreationMode ? "-new" : "-edit";

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
    <ScrollView style={{ marginHorizontal: 10, height: "100%" }}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder={"Título"}
        style={[global.input]}
        placeholderTextColor="#000"
      />
      <MarkdownEditor
        onMarkdownChange={onChangeText}
        markdown={body}
        placeholder="Escreva aqui..."
        placeholderTextColor={colors.text}
        textInputStyles={markdownStyles({ colors }).textInputStyles}
        buttonContainerStyles={markdownStyles({ colors }).buttonContainerStyles}
        buttonStyles={markdownStyles({ colors }).buttonStyles}
        markdownViewStyles={markdownStyles({ colors }).markdownContainerStyles}
      />
      <TextInput
        value={source}
        onChangeText={setSource}
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
          style={[
            global.loginButtonContainer,
            { width: isCreationMode ? 100 : 150 },
          ]}
        >
          {!isLoading && (
            <Text style={global.loginButton}>
              {isCreationMode ? "Publicar" : "Salvar alterações"}
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
