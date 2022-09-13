"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPageData = exports.getPostData = exports.convertToUTC = exports.scrap = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
const node_cron_1 = require("node-cron");
const mongo_1 = require("./db/mongo");
async function scrap(url = "http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/lists") {
    const data = await axios_1.default.get(url, {
        proxy: {
            host: process.env.TOR_HOST || "localhost",
            port: 8118,
        },
    });
    return data.data;
}
exports.scrap = scrap;
function convertToUTC(time) {
    const [number, timeUnit] = time.split(" ");
    let timeUnits;
    (function (timeUnits) {
        timeUnits["Hour"] = "Hour";
        timeUnits["Hours"] = "Hours";
        timeUnits["Minute"] = "Minute";
        timeUnits["Minutes"] = "Minutes";
        timeUnits["Week"] = "Week";
        timeUnits["Weeks"] = "Weeks";
        timeUnits["Day"] = "Day";
        timeUnits["Days"] = "Days";
        timeUnits["Second"] = "Second";
        timeUnits["Seconds"] = "Seconds";
    })(timeUnits || (timeUnits = {}));
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
        date.setDate(date.getDate() - Number(number) * 7);
    }
    if (timeUnit.includes(timeUnits.Week)) {
        date.setMonth(date.getMonth() - Number(number));
    }
    return date.toUTCString();
}
exports.convertToUTC = convertToUTC;
const getPostData = async (url) => {
    if (!url)
        return "";
    const html = await scrap(url);
    const $ = (0, cheerio_1.load)(html);
    const text = $("ol").text().replace(/\n/g, ' ');
    return text;
};
exports.getPostData = getPostData;
const createPostObjects = async ($, tr) => {
    const title = $(tr).find("td:nth-child(1) a").text();
    const author = $(tr).find("td:nth-child(2)").text();
    const timeAgo = $(tr).find("td:nth-child(4)").text();
    const date = convertToUTC(timeAgo);
    const url = $(tr).find("td a").attr("href");
    const content = await (0, exports.getPostData)(url);
    return { title, author, date, url, content };
};
const createPageData = async (time) => {
    (0, node_cron_1.schedule)(time, async (now) => {
        console.log(now.toLocaleTimeString());
        const page = await scrap("http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/lists");
        const $ = (0, cheerio_1.load)(page);
        $("tr")
            .toArray()
            .slice(1)
            .forEach(async (tr) => {
            const obj = await createPostObjects($, tr);
            console.log(obj);
            await mongo_1.PasteModel.updateOne({ url: obj.url }, { $set: obj }, { upsert: true });
        });
    });
};
exports.createPageData = createPageData;
//# sourceMappingURL=scrapper.js.map