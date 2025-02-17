import { Types } from "mongoose";

export interface CharacterPuzzleLevel {
  _id?: string | Types.ObjectId;
  game_id: string | Types.ObjectId;
  level_id: string;
  title: string;
  description: string;
  character_puzzle_master_id: Types.ObjectId[];
  difficulty: "easy" | "medium" | "hard";
  time_limit: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateCharacterPuzzleLevel {
  game_id: string;
  level_id: string;
  title: string;
  description: string;
  character_puzzle_master_id: string[];
  difficulty: "easy" | "medium" | "hard";
  time_limit: number;
}

export interface UpdateCharacterPuzzleLevel {
  level_id?: string;
  title?: string;
  description?: string;
  character_puzzle_master_id?: string[];
  difficulty?: "easy" | "medium" | "hard";
  time_limit?: number;
  is_active?: boolean;
}
