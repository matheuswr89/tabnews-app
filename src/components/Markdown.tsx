import { useNavigation, useTheme } from "@react-navigation/native";
import * as cheerio from "cheerio";
import { Fragment, ReactNode, useEffect, useState } from "react";
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
import { useTheme as personalTheme } from "../hooks/useTheme";

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
  const { getTheme } = personalTheme();
  const { colors } = useTheme();
  const renderer = new CustomRenderer(push);

  const [colorScheme, setScheme] = useState<any>("ligth");
  useEffect(() => {
    async function changeTheme() {
      setScheme((await getTheme()) ? "ligth" : "dark");
    }
    changeTheme();
  }, []);

  let valueParse = body;
  const $ = cheerio.load(valueParse);
  const head = "######";

  $("code").each(function (i, e) {
    const content = $(this)
      .toString()
      .replace("<code>", "")
      .replace("</code>", "");

    const code = "```\n" + content.trim() + "\n```";
    $(this).replaceWith(code);
  });
  $("pre").each(function (i, e) {
    const content = $(this)
      .toString()
      .replace("<pre>", "")
      .replace("</pre>", "");
    const code = "```\n" + content.trim() + "\n```";
    $(this).replaceWith(code);
  });
  $("div").each(function (i, e) {
    $(this).replaceWith($(this).html().trim());
  });
  $("img").each(function (i, e) {
    const img = `![img${i}](${$(this).attr("src")})`;
    $(this).replaceWith(img);
  });
  $("a").each(function () {
    let link = `[${$(this).text()}](${$(this).attr("href")})`;
    $(this).replaceWith(link);
  });
  $("b").each(function () {
    const link = `**${$(this).text()}**`;
    $(this).replaceWith(link);
  });
  $("del").each(function () {
    const link = `~~${$(this).text()}~~`;
    $(this).replaceWith(link);
  });
  $("hr").each(function () {
    $(this).replaceWith("---");
  });
  $("i").each(function () {
    const link = `*${$(this).text()}*`;
    $(this).replaceWith(link);
  });
  for (let i = 1; i <= 6; i++) {
    $("h" + i).each(function () {
      const headMarkdown = `${head.substring(0, i)} ${$(this).text()}`;
      $(this).replaceWith(headMarkdown);
    });
  }
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
  const elements = useMarkdown($.text(), options);

  return elements.map((element, index) => {
    return <Fragment key={`demo_${index}`}>{element}</Fragment>;
  });
}
