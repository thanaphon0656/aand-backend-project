import { model, Schema, Document, Types } from "mongoose";
import { LetterMatchWordsLevel } from "../interfaces/letterMatchWordsLevel.interface";

const letterMatchWordsLevelSchema: Schema = new Schema({
  game_id: {
    type: Types.ObjectId,
    ref: "game",
    required: true,
  },
  level_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  time_limit: {
    type: Number,
    required: true,
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

const LetterMatchWordsLevelModel = model<LetterMatchWordsLevel & Document>(
  "letter_match_words_level",
  letterMatchWordsLevelSchema
);

export default LetterMatchWordsLevelModel;