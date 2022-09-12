"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPageData = exports.createPostData = exports.scrap = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
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
const createPostData = async (url) => {
    if (!url)
        return "";
    const html = await scrap(url);
    const $ = (0, cheerio_1.load)(html);
    const text = $("ol").text();
    return text;
};
exports.createPostData = createPostData;
const createPageData = async (htmlStr) => {
    // const response = await axios.get('http://172.17.0.1:5500/src/server/index.html');
    const body = await scrap(htmlStr);
    const $ = (0, cheerio_1.load)(body);
    const dataArray = $("tr")
        .toArray()
        .slice(1)
        .map(async (tr) => {
        const title = $(tr).find("td:nth-child(1) a").text();
        const auther = $(tr).find("td:nth-child(2)").text();
        const date = $(tr).find("td:nth-child(4)").text();
        const url = $(tr).find("td a").attr("href");
        const content = await (0, exports.createPostData)(url);
        const postData = { title, auther, date, content };
        return postData;
    });
    return Promise.all(dataArray);
};
exports.createPageData = createPageData;
//# sourceMappingURL=scrapper.js.map