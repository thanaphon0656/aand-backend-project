import { model, Schema, Document, Types } from "mongoose";
import { LetterMatchWordsMaster } from "../interfaces/letterMatchWordsMaster.interface";

const letterMatchWordsMasterSchema: Schema = new Schema({
  game_id: {
    type: Types.ObjectId,
    ref: "game",
    required: true,
  },
  word: {
    type: String,
    required: true,
  },
  phonetics: {
    type: [String],
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  sound: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
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

const LetterMatchWordsMasterModel = model<LetterMatchWordsMaster & Document>(
  "letter_match_words_master",
  letterMatchWordsMasterSchema
);

export default LetterMatchWordsMasterModel;