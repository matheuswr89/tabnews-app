import { AxiosResponse } from "axios";
import * as cheerio from "cheerio";

export const parseSearch = (
  response: AxiosResponse,
  setNextPageLink: any,
  setValue: any
) => {
  const $ = cheerio.load(response.data);
  setNextPageLink($('a[aria-label="Próxima página"]').attr("href"));
  $("a").each(function () {
    const cont = $(this);
    if (
      cont.attr("href").includes("/url?q=https://www.tabnews.com.br/") &&
      !cont.text().includes("Página")
    ) {
      const url = cont
        .attr("href")
        ?.replace("/url?q=https://www.tabnews.com.br/", "")
        .split("&")[0];
      const content = {
        title: cont.text().split(" - TabNewswww")[0].split("www.")[0],
        url,
      };
      setValue((oldMessages: any) => [...oldMessages, content]);
    }
  });
};
