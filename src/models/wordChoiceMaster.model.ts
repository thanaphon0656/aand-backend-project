import { model, Schema, Document, Types } from "mongoose";
import { WordChoiceMaster } from "../interfaces/wordChoiceMaster.interface";

const wordChoiceMasterSchema: Schema = new Schema({
  game_id: {
    type: Types.ObjectId,
    ref: "game",
    required: true,
  },
  word: {
    type: String,
    required: true,
  },
  choice: {
    type: [String],
    required: true
  },
  image_url: {
    type: String
  },
  sound: {
    type: String
  },
  is_active: {
    type: Boolean,
    required: true,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const WordChoiceMasterModel = model<WordChoiceMaster & Document>(
  "word_choice_master",
  wordChoiceMasterSchema
);

export default WordChoiceMasterModel;