import axios from "axios";
import { load } from "cheerio";


export async function scrap(url="http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/lists") {
const data = await axios.get(url, {
    proxy: {
      host: process.env.TOR_HOST || "localhost",
      port: 8118,
    },
  }
)
return data.data;
}

export const createPostData = async (url: string | undefined) => {
  if (!url) return "";
  const html = await scrap(url);
  const $ = load(html);
  const text = $("ol").text();

  return text;
};


export const createPageData = async (htmlStr: string) => {
    // const response = await axios.get('http://172.17.0.1:5500/src/server/index.html');
    const body = await scrap(htmlStr);
    const $ = load(body);
    const dataArray = $("tr")
    .toArray()
    .slice(1)
    .map(async (tr: any) => {
        const title = $(tr).find("td:nth-child(1) a").text();
        const auther = $(tr).find("td:nth-child(2)").text();
        const date = $(tr).find("td:nth-child(4)").text();
        const url = $(tr).find("td a").attr("href");
        const content = await createPostData(url)     
        const postData = { title, auther, date , content};
        return postData
    });
    return Promise.all(dataArray)
}
