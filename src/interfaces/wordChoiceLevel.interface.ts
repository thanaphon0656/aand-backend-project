import { Types } from "mongoose";

export interface WordChoiceLevel {
  _id?: string | Types.ObjectId;
  game_id: string | Types.ObjectId;
  level_id: string;
  title: string;
  description: string;
  word_choice_master_id: Types.ObjectId;
  difficulty: "easy" | "medium" | "hard";
  time_limit: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateWordChoiceLevel {
  game_id: string;
  level_id: string;
  title: string;
  description: string;
  word_choice_master_id: Types.ObjectId;
  difficulty: "easy" | "medium" | "hard";
  time_limit: number;
}

export interface UpdateWordChoiceLevel {
  level_id?: string;
  title?: string;
  description?: string;
  word_choice_master_id: Types.ObjectId;
  difficulty?: "easy" | "medium" | "hard";
  time_limit?: number;
  is_active?: boolean;
}
