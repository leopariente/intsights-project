import { Schema, model } from "mongoose";

const PasteSchema = new Schema({
    title: String,
    author: String,
    date: String,
    content: String,
    url: String
  });
  
  export const PasteModel = model("Paste", PasteSchema);