import { model, Schema, Document, Types } from "mongoose";
import { SpellingQuestMaster } from "../interfaces/spellingQuestMaster.interface";

const spellingQuestMasterSchema: Schema = new Schema({
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
  image_url: {
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

const SpellingQuestMasterModel = model<SpellingQuestMaster & Document>(
  "spelling_quest_master",
  spellingQuestMasterSchema
);

export default SpellingQuestMasterModel;