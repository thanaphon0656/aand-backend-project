import { model, Schema, Document, Types } from "mongoose";
import { CompleteTheWordLevel } from "../interfaces/completeTheWordLevel.interface";

const completeTheWordLevelSchema: Schema = new Schema({
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
  complete_the_word_master_id: {
    type: Types.ObjectId,
    ref: "complete_the_word_master",
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

const CompleteTheWordLevelModel = model<CompleteTheWordLevel & Document>(
  "complete_the_word_level",
  completeTheWordLevelSchema
);

export default CompleteTheWordLevelModel;