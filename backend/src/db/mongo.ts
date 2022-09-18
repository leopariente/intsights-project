import { connect } from "mongoose";
import { PasteModel } from "./models/pasteModel"
require("dotenv").config();

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
  return list;
}
