import { model, Schema, Document, Types } from "mongoose";
import { WordChoiceLevel } from "../interfaces/wordChoiceLevel.interface";

const wordChoiceLevelSchema: Schema = new Schema({
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
  word_choice_master_id: {
    type: Types.ObjectId,
    ref: "word_choice_master",
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

const WordChoiceLevelModel = model<WordChoiceLevel & Document>(
  "word_choice_level",
  wordChoiceLevelSchema
);

export default WordChoiceLevelModel;