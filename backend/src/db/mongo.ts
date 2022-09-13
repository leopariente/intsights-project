import { Schema, model, connect } from "mongoose";
require("dotenv").config();

const PasteSchema = new Schema({
  title: String,
  author: String,
  date: String,
  content: String,
  url: String
});

export const PasteModel = model("Paste", PasteSchema);

// Connection to mongo atlas
connect(
  process.env.DATABASE_URL!
).catch((err) => console.log(err));

// Add a parking spot to the database
export function addToDB(data: any) {
  PasteModel.insertMany(data)
    .then(function () {
      console.log("Data inserted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
}

export async function getDB() {
  const list = await PasteModel.find();
  console.log(list);
  return list;
}
