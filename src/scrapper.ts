import axios from "axios";
import { Element, load, CheerioAPI } from "cheerio";
import { PasteModel } from "./mongo";

export async function scrap(
  url = "http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/lists"
) {
  const data = await axios.get(url, {
    proxy: {
      host: process.env.TOR_HOST || "localhost",
      port: 8118,
    },
  });
  return data.data;
}

export const createPostData = async (url: string | undefined) => {
  if (!url) return "";
  const html = await scrap(url);
  const $ = load(html);
  const text = $("ol").text();

  return text;
};

const createPostObjects = async ($: CheerioAPI, tr: Element) => {
  const title = $(tr).find("td:nth-child(1) a").text();
  const auther = $(tr).find("td:nth-child(2)").text();
  const date = $(tr).find("td:nth-child(4)").text();
  const url = $(tr).find("td a").attr("href");
  const content = await createPostData(url);
  return { title, auther, date, url, content };
};

export const createPageData = async (htmlStr: string) => {
  const $ = load(htmlStr);
  const postsData = $("tr")
    .toArray()
    .slice(1)
    .forEach(async (tr, i) => {
      const obj = await createPostObjects($, tr);
      await PasteModel.updateOne(
        { url: obj.url },
        { $set: obj },
        { upsert: true }
      );
    });
};
