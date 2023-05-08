import { MarkdownEditor as Editor } from "@matheuswr89/react-native-markdown-editor";
import { useTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { colorScheme as scheme } from "../context/ThemeContext";

export default function MarkdownEditor({ onChangeText, body }) {
  const { colors } = useTheme();
  const { colorScheme } = scheme();
  return (
    <Editor
      onMarkdownChange={onChangeText}
      markdown={body}
      placeholder="Escreva aqui..."
      placeholderTextColor={colors.text}
      textInputStyles={markdownStyles({ colors }).textInputStyles}
      buttonContainerStyles={markdownStyles({ colors }).buttonContainerStyles}
      buttonStyles={markdownStyles({ colors }).buttonStyles}
      markdownViewStyles={markdownStyles({ colors }).markdownContainerStyles}
      colorScheme={colorScheme}
    />
  );
}
const markdownStyles = StyleSheet.create((props) => {
  return {
    textInputStyles: {
      borderWidth: 2,
      padding: 4,
      backgroundColor: props.colors.card,
      borderColor: props.colors.text,
      color: props.colors.text,
      textAlignVertical: "top",
      paddingLeft: 8,
      fontSize: 16,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    buttonContainerStyles: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      borderWidth: 2,
      borderTopWidth: 0,
      backgroundColor: props.colors.card,
      borderColor: props.colors.text,
    },
    markdownContainerStyles: {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderWidth: 2,
      backgroundColor: props.colors.card,
      borderColor: props.colors.text,
    },
    buttonStyles: {
      padding: 8,
      color: props.colors.text,
      borderColor: props.colors.text,
    },
  };
});
