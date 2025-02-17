import { model, Schema, Document, Types } from "mongoose";
import { CharacterPuzzleLevel } from "../interfaces/characterPuzzleLevel.interface";

const characterPuzzleLevelSchema: Schema = new Schema({
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
  character_puzzle_master_id: [
    {
      type: Types.ObjectId,
      ref: "character_puzzle_master",
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

const CharacterPuzzleLevelModel = model<CharacterPuzzleLevel & Document>(
  "character_puzzle_level",
  characterPuzzleLevelSchema
);

export default CharacterPuzzleLevelModel;
