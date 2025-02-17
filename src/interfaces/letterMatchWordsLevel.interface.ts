import { Types } from "mongoose";

export interface LetterMatchWordsLevel {
  _id?: string | Types.ObjectId;
  game_id: string | Types.ObjectId;
  level_id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  time_limit: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateLetterMatchWordsLevel {
  game_id: string | Types.ObjectId;
  level_id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  time_limit: number;
}

export interface UpdateLetterMatchWordsLevel {
  level_id?: string;
  title?: string;
  description?: string;
  difficulty?: "easy" | "medium" | "hard";
  time_limit?: number;
  is_active?: boolean;
}
