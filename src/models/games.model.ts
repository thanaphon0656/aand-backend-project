import { model, Schema, Document } from "mongoose";
import { Games } from "@interfaces/games.interface";

const gamesSchema: Schema = new Schema({
  name_th: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

const gamesModel = model<Games & Document>(
  "game",
  gamesSchema
);

export default gamesModel;
