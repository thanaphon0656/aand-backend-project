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
  },
  phonetics: {
    type: [
      {
        key: { type: String },
        sound_sub: { type: String, default: "" }
      }
    ],
    required: true
  },
  image_url: {
    type: String,
  },
  sound: {
    type: String,
  },
  is_active: {
    type: Boolean,
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