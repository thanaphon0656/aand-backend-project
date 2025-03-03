import { Types } from "mongoose";

export interface LeaderboardHistory {
  _id?: string | Types.ObjectId;
  player_id: string | Types.ObjectId;
  game_id: string | Types.ObjectId;
  level_id:  string | Types.ObjectId;
  score: number;
  created_at: Date;
  updated_at: Date;
}