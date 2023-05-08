import { parseHTML } from "@matheuswr89/react-native-markdown-editor";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Fragment, ReactNode } from "react";
import {
  ImageStyle,
  Linking,
  Text,
  TextStyle,
  TouchableHighlight,
} from "react-native";
import {
  Renderer,
  RendererInterface,
  useMarkdown,
  useMarkdownHookOptions,
} from "react-native-marked";
import * as mime from "react-native-mime-types";
import { SvgUri } from "react-native-svg";
import { colorScheme as scheme } from "../context/ThemeContext";

class CustomRenderer extends Renderer implements RendererInterface {
  push: any;
  constructor(push) {
    super();
    this.push = push;
  }

  link(
    children: string | ReactNode[],
    href: string,
    styles?: TextStyle
  ): ReactNode {
    const onPressAction = () => {
      if (href.includes("https://www.tabnews.com.br/"))
        this.push("Content", {
          url: href.split("https://www.tabnews.com.br/")[1],
        });
      else Linking.openURL(href);
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
  linkImage(
    href: string,
    imageUrl: string,
    alt?: string,
    style?: ImageStyle
  ): ReactNode {
    const imageNode = this.image(imageUrl, alt, style);
    const mimeType = mime.lookup(imageUrl);
    return (
      <TouchableHighlight
        accessibilityRole="link"
        accessibilityHint="Opens in a new window"
        onPress={() => Linking.openURL(href)}
        key={this.getKey()}
      >
        {mimeType.toString().includes("image/svg") ? (
          <SvgUri uri={imageUrl} />
        ) : (
          imageNode
        )}
      </TouchableHighlight>
    );
  }
}

export default function MarkdownView({ body }: any): any {
  const { push }: any = useNavigation();
  const { colors } = useTheme();
  const renderer = new CustomRenderer(push);
  const { colorScheme } = scheme();

  const options: useMarkdownHookOptions = {
    renderer,
    colorScheme,
    styles: {
      codespan: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.text,
        fontStyle: "italic",
        backgroundColor: "rgba(110,118,129,0.4)",
        fontWeight: "300",
      },
      code: {
        backgroundColor: colors.border,
        minWidth: "100%",
        padding: 10,
      },
    },
  };
  const elements = useMarkdown(parseHTML(body), options);

  return elements.map((element, index) => {
    return <Fragment key={`demo_${index}`}>{element}</Fragment>;
  });
}
