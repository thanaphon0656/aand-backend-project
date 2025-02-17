import { model, Schema, Document, Types } from "mongoose";
import { CharacterPuzzleMaster } from "../interfaces/characterPuzzleMaster.interface";

const characterPuzzleMasterSchema: Schema = new Schema({
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
  type: {
    type: String,
    enum: ["พยัญชนะ", "สระ", "วรรณยุกต์"],
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

const CharacterPuzzleMasterModel = model<CharacterPuzzleMaster & Document>(
  "character_puzzle_master",
  characterPuzzleMasterSchema
);

export default CharacterPuzzleMasterModel;