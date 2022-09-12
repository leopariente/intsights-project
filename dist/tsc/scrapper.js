"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrap = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
function scrap() {
    axios_1.default.get("http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/lists", {
        proxy: {
            host: process.env.TOR_HOST || "localhost",
            port: 8118,
        },
    }).then(res => fs_1.default.writeFileSync("index.html", res.data));
}
exports.scrap = scrap;
//# sourceMappingURL=scrapper.js.map