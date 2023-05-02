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
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthContext from "../context/AuthContext";
import ReloadContentContext from "../context/ReloadContentContext";
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

  useEffect(() => {
    navigation.setOptions({
      title: isCreationMode ? "Novo post" : "Editar post",
    });
  }, []);

  const [title, setTitle]: any = useState(content?.title || "");
  const [body, setBody]: any = useState(content?.body || "");
  const [source, setSource]: any = useState(content?.source_url || "");

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

    if (mode === "creation")
      postContent(payload, toggleReload).then((content) => {
        logInUser();
        navigation.replace("Content", {
          url: `${user.username}/${content.data.slug}`,
          title: content.data.title,
        });
      });
    if (mode === "edition") {
      const url = `${content.owner_username}/${content.slug}`;
      deleteOrEditContent(url, payload, toggleReload).then((content) => {
        logInUser();
        navigation.navigate("Content", {
          url: `${user.username}/${content.data.slug}`,
          title,
        });
      });
    }
  };

  return (
    <SafeAreaView style={{ marginHorizontal: 10, height: "100%" }}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder={"Título"}
        style={[global.input]}
      />
      <MarkdownEditor
        onMarkdownChange={setBody}
        markdown={body}
        placeholder="Escreva aqui..."
        placeholderTextColor={colors.text}
        textInputStyles={markdownStyles({ colors }).textInputStyles}
        buttonContainerStyles={markdownStyles({ colors }).buttonContainerStyles}
        buttonStyles={markdownStyles({ colors }).buttonStyles}
      />
      <TextInput
        value={source}
        onChangeText={setSource}
        placeholder={"Fonte (opcional)"}
        style={[global.input]}
        keyboardType={"url"}
      />
      <TouchableOpacity
        onPress={enviarPost}
        style={global.loginButtonContainer}
      >
        {!isLoading && (
          <Text style={global.loginButton}>
            {isCreationMode ? "Publicar" : "Salvar alterações"}
          </Text>
        )}
        {isLoading && <ActivityIndicator size="large" />}
      </TouchableOpacity>
    </SafeAreaView>
  );
};
