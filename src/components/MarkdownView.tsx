import { parseHTML } from "@matheuswr89/react-native-markdown-editor";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Fragment, ReactNode } from "react";
import SyntaxHighlighter from "react-native-syntax-highlighter"; // 2.0.0
import { colorScheme as scheme } from "../context/ThemeContext";
import { MarkdownViewInterface } from "../models/ComponentsModel";

import { Linking, Text, TextStyle, View } from "react-native";
import {
  Renderer,
  RendererInterface,
  useMarkdown,
  useMarkdownHookOptions,
} from "react-native-marked";

import uuid from "react-native-uuid";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { githubGist, normalizeString } from "../util/util";

class CustomRenderer extends Renderer implements RendererInterface {
  push: any;
  colors: any;
  constructor(push, colors) {
    super();
    this.push = push;
    this.colors = colors;
  }
  custom(
    identifier: string,
    _raw: string,
    _children?: ReactNode[],
    args?: Record<string, unknown>
  ): ReactNode {
    return null;
  }
  heading(text: string | ReactNode[], styles?: TextStyle): ReactNode {
    return (
      <Text selectable key={uuid.v4()} style={styles}>
        {text}
      </Text>
    );
  }
  codespan(text: string, styles?: TextStyle): ReactNode {
    return (
      <Text style={styles} key={uuid.v4()} selectable>
        {normalizeString(text)}
      </Text>
    );
  }
  code(
    text: string,
    _language?: string,
    containerStyle?: ViewStyle,
    textStyle?: TextStyle
  ): ReactNode {
    return (
      <SyntaxHighlighter
        style={githubGist(this.colors)}
        customStyle={containerStyle}
        language={_language}
        highlighter="hljs"
        key={uuid.v4()}
        selectable
      >
        {text}
      </SyntaxHighlighter>
    );
  }
  link(
    children: string | ReactNode[],
    href: string,
    styles?: TextStyle
  ): ReactNode {
    const onPressAction = () => {
      if (href.includes("https://www.tabnews.com.br/")) {
        let hrefSplit = href.split("https://www.tabnews.com.br/")[1];
        let hrefLength = hrefSplit.split("/").length;
        if (hrefLength === 1) {
          this.push("Perfil", {
            name: hrefSplit,
          });
        } else if (hrefLength === 2) {
          this.push("Content", {
            url: hrefSplit,
          });
        }
      } else Linking.openURL(href);
    };
    return (
      <Text
        accessibilityRole="link"
        accessibilityHint="Opens in a new window"
        key={this.getKey()}
        onPress={onPressAction}
        style={styles}
        selectable
      >
        {children}
      </Text>
    );
  }
}

export default function MarkdownView({ body }: MarkdownViewInterface) {
  const { push }: any = useNavigation();
  const { colors } = useTheme();
  const { colorScheme } = scheme();
  const renderer = new CustomRenderer(push, colors);

  const options: useMarkdownHookOptions = {
    renderer,
    colorScheme,
    styles: {
      codespan: {
        color: colors.text,
        backgroundColor: "rgba(110,118,129,0.4)",
        fontSize: 14,
      },
      code: {
        backgroundColor: colors.notification,
        minWidth: "100%",
        padding: 10,
        borderRadius: 6,
      },
      h1: {
        fontSize: 24,
        fontWeight: "bold",
        borderBottomWidth: 1,
        borderBottomColor: colors.text,
        marginVertical: 8,
        paddingBottom: 4,
      },
      h2: {
        fontSize: 22,
        lineHeight: 36,
        borderBottomWidth: 1,
        borderBottomColor: colors.text,
        marginVertical: 8,
        paddingBottom: 4,
      },
      h3: {
        fontSize: 20,
        lineHeight: 32,
        marginVertical: 4,
      },
      h4: {
        fontSize: 18,
        lineHeight: 28,
        marginVertical: 4,
      },
    },
  };
  const parsedContent = parseHTML(body);
  const normalizedContent = normalizeString(parsedContent);
  const elements = useMarkdown(normalizedContent, options);

  return (
    <View key={`markdown${uuid.v4()}`}>
      {elements.map((element, index) => {
        return <Fragment key={`demo_${index}`}>{element}</Fragment>;
      })}
    </View>
  );
}
