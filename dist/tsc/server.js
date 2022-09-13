"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const mongo_1 = require("./db/mongo");
// import { createPageData } from './scrapper';
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use((0, body_parser_1.json)());
const port = process.env.PORT || 4000;
//@ts-ignore
exports.app.get("/", (req, res) => {
    res.send((0, mongo_1.getDB)());
});
exports.app.listen(port, () => {
    console.log('Hosted: http://localhost:' + port);
    // createPageData("*/2 * * * *");
});
//# sourceMappingURL=server.js.map