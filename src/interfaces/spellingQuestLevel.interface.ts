import { Types } from "mongoose";

export interface SpellingQuestLevel {
  _id?: string | Types.ObjectId;
  game_id: string | Types.ObjectId;
  level_id: string;
  title: string;
  description: string;
  spelling_quest_master_id: Types.ObjectId[];
  difficulty: "easy" | "medium" | "hard";
  time_limit: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateSpellingQuestLevel {
  game_id: string;
  level_id: string;
  title: string;
  description: string;
  spelling_quest_master_id: string[];
  difficulty: "easy" | "medium" | "hard";
  time_limit: number;
}

export interface UpdateSpellingQuestLevel {
  level_id?: string;
  title?: string;
  description?: string;
  spelling_quest_master_id?: string[];
  difficulty?: "easy" | "medium" | "hard";
  time_limit?: number;
  is_active?: boolean;
}
