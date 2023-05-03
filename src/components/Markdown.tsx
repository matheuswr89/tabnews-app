import { useNavigation } from "@react-navigation/native";
import * as cheerio from "cheerio";
import { ReactNode } from "react";
import { Linking, Text, TextStyle } from "react-native";
import Markdown, { Renderer, RendererInterface } from "react-native-marked";
import uuid from "react-native-uuid";

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
}

export default function MarkdownView({ id, body, card }: any) {
  const { push }: any = useNavigation();
  const renderer = new CustomRenderer(push);

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
    const link = `[${$(this).text()}](${$(this).attr("href")})`;
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

  return (
    <Markdown
      key={`_keyMarkdown${uuid.v4()}`}
      flatListProps={{
        listKey: (item, index) => `_keylistKey${index.toString()}`,
        keyExtractor: (item, index) => `_keyExtractor${index.toString()}`,
        style: { backgroundColor: card, marginLeft: 3 },
        initialNumToRender: 10,
        progressViewOffset: 10,
        accessible: true,
      }}
      value={$.text()}
      renderer={renderer}
    />
  );
}
