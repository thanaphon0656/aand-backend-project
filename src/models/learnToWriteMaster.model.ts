import { model, Schema, Document, Types } from "mongoose";
import { LearnToWriteMaster } from "../interfaces/learnToWriteMaster.interface";

const learnToWriteMasterSchema: Schema = new Schema({
  game_id: {
    type: Types.ObjectId,
    ref: "game",
    required: true,
  },
  letter: {
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

const LearnToWriteMasterModel = model<LearnToWriteMaster & Document>(
  "learn_to_write_master",
  learnToWriteMasterSchema
);

export default LearnToWriteMasterModel;
