import axios from "axios";
import { Element, load, CheerioAPI } from "cheerio";
import { schedule } from "node-cron";
import { PasteModel } from "./db/mongo";

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

export function convertToUTC(time: string) {
 const [number, timeUnit] = time.split(" ");
 enum timeUnits {
  Hour = "Hour",
  Hours = "Hours",
  Minute = "Minute",
  Minutes = "Minutes",
  Week = "Week",
  Weeks = "Weeks",
  Day = "Day",
  Days = "Days",
  Second = "Second",
  Seconds = "Seconds"
 }
 const date = new Date();
 if (timeUnit.includes(timeUnits.Second)) {
  date.setSeconds(date.getSeconds() - Number(number));
 }
 if (timeUnit.includes(timeUnits.Minute)) {
  date.setMinutes(date.getMinutes() - Number(number));
 }
 if (timeUnit.includes(timeUnits.Hour)) {
  date.setHours(date.getHours() - Number(number));
 }
 if (timeUnit.includes(timeUnits.Day)) {
  date.setDate(date.getDate() - Number(number));
 }
 if (timeUnit.includes(timeUnits.Week)) {
  date.setDate(date.getDate() - Number(number)*7);
 }
 if (timeUnit.includes(timeUnits.Week)) {
  date.setMonth(date.getMonth() - Number(number));
 }
 return date.toUTCString();
}

export const getPostData = async (url: string | undefined) => {
  if (!url) return "";
  const html = await scrap(url);
  const $ = load(html);
  const text = $("ol").text().replace(/\n/g,' ');

  return text;
};

const createPostObjects = async ($: CheerioAPI, tr: Element) => {
  const title = $(tr).find("td:nth-child(1) a").text();
  const author = $(tr).find("td:nth-child(2)").text();
  const timeAgo = $(tr).find("td:nth-child(4)").text();
  const date = convertToUTC(timeAgo);
  const url = $(tr).find("td a").attr("href");
  const content = await getPostData(url);
  return { title, author, date, url, content };
};

export const createPageData = async (time: string) => {
  schedule(time, async (now: Date) => {
    console.log(now.toLocaleTimeString());
    const page = await scrap("http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/lists");
    const $ = load(page);
     $("tr")
      .toArray()
      .slice(1)
      .forEach(async (tr) => {
        const obj = await createPostObjects($, tr);
        console.log(obj);
        await PasteModel.updateOne(
          { url: obj.url },
          { $set: obj },
          { upsert: true }
        );
      });
  })
};
