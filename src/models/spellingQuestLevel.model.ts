import { model, Schema, Document, Types } from "mongoose";
import { SpellingQuestLevel } from "../interfaces/spellingQuestLevel.interface";

const spellingQuestLevelSchema: Schema = new Schema({
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
  spelling_quest_master_id: {
    type: Types.ObjectId,
    ref: "spelling_quest_master",
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

const SpellingQuestLevelModel = model<SpellingQuestLevel & Document>(
  "spelling_quest_level",
  spellingQuestLevelSchema
);

export default SpellingQuestLevelModel;