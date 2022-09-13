"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDB = exports.addToDB = exports.PasteModel = void 0;
const mongoose_1 = require("mongoose");
require("dotenv").config();
const PasteSchema = new mongoose_1.Schema({
    title: String,
    author: String,
    date: String,
    content: String,
    url: String
});
exports.PasteModel = (0, mongoose_1.model)("Paste", PasteSchema);
// Connection to mongo atlas
(0, mongoose_1.connect)(process.env.DATABASE_URL).catch((err) => console.log(err));
// Add a parking spot to the database
function addToDB(data) {
    exports.PasteModel.insertMany(data)
        .then(function () {
        console.log("Data inserted"); // Success
    })
        .catch(function (error) {
        console.log(error); // Failure
    });
}
exports.addToDB = addToDB;
async function getDB() {
    const list = await exports.PasteModel.find();
    console.log(list);
    return list;
}
exports.getDB = getDB;
//# sourceMappingURL=mongo.js.map