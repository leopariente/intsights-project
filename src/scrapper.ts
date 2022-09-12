import axios from "axios";
import fs from "fs"
import { Cheerio } from "cheerio";


export function scrap() {
axios.get("http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/lists", {
    proxy: {
      host: process.env.TOR_HOST || "localhost",
      port: 8118,
    },
  }
).then(res => fs.writeFileSync("index.html", res.data))
}