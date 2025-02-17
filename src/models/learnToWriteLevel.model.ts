import { model, Schema, Document, Types } from "mongoose";
import { LearnToWriteLevel } from "../interfaces/learnToWriteLevel.interface";

const learnToWriteLevelSchema: Schema = new Schema({
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
  learn_to_write_master_id: [
    {
      type: Types.ObjectId,
      ref: "learn_to_write_master",
      required: true,
    },
  ],
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

const LearnToWriteLevelModel = model<LearnToWriteLevel & Document>(
  "learn_to_write_level",
  learnToWriteLevelSchema
);

export default LearnToWriteLevelModel;
