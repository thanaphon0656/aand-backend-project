import { Types } from "mongoose";

export interface LearnToWriteLevel {
  _id?: string | Types.ObjectId;
  game_id: string | Types.ObjectId;
  level_id: string;
  title: string;
  description: string;
  learn_to_write_master_id: Types.ObjectId[];
  difficulty: "easy" | "medium" | "hard";
  time_limit: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateLearnToWriteLevel {
  game_id: string | Types.ObjectId;
  level_id: string;
  title: string;
  description: string;
  learn_to_write_master_id: string[];
  difficulty: "easy" | "medium" | "hard";
  time_limit: number;
}

export interface UpdateLearnToWriteLevel {
  level_id?: string;
  title?: string;
  description?: string;
  learn_to_write_master_id?: string[];
  difficulty?: "easy" | "medium" | "hard";
  time_limit?: number;
  is_active?: boolean;
}
