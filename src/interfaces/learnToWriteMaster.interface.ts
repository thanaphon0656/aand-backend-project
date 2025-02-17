import { Types } from "mongoose";

export interface LearnToWriteMaster {
  game_id: Types.ObjectId;
  letter: string;
  image_url: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateLearnToWriteMaster {
  game_id: string;
  letter: string;
  image_url: string;
}

export interface UpdateLearnToWriteMaster {
  letter?: string;
  image_url?: string;
  is_active?: boolean;
}
