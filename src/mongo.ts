import { Schema, model, connect } from "mongoose";

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
  "mongodb+srv://Cyber4s:ilovecode@cluster0.pluyv.mongodb.net/pastes?retryWrites=true&w=majority"
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
