import { Types } from "mongoose";

export interface WordChoiceMaster {
  _id?: string | Types.ObjectId;
  game_id: string | Types.ObjectId;
  word: string;
  image_url: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateWordChoiceMasterMaster {
  game_id: string | Types.ObjectId;
  word: string;
  image_url: string;
}

export interface UpdateWordChoiceMasterMaster {
  word?: string;
  image_url?: string;
  is_active?: boolean;
}
