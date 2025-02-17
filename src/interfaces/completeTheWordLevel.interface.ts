import { Types } from "mongoose";

export interface CompleteTheWordLevel {
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

export interface CreateCompleteTheWordLevel {
  game_id: string;
  level_id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  time_limit: number;
}

export interface UpdateCompleteTheWordLevel {
  level_id?: string;
  title?: string;
  description?: string;
  difficulty?: "easy" | "medium" | "hard";
  time_limit?: number;
  is_active?: boolean;
}
