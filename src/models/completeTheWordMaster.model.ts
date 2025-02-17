import { model, Schema, Document, Types } from "mongoose";
import { CompleteTheWordMaster } from "../interfaces/completeTheWordMaster.interface";

const completeTheWordMasterSchema: Schema = new Schema({
  game_id: {
    type: Types.ObjectId,
    ref: "game",
    required: true,
  },
  consonant: {
    type: String,
    required: true,
  },
  vowel: {
    type: String,
    required: true,
  },
  image_url: {
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

const CompleteTheWordMasterModel = model<CompleteTheWordMaster & Document>(
  "complete_the_word_master",
  completeTheWordMasterSchema
);

export default CompleteTheWordMasterModel;