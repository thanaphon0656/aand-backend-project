import { Types } from "mongoose";

export interface CompleteTheWordMaster {
  _id?: string | Types.ObjectId;
  game_id: string | Types.ObjectId;
  consonant: string;
  vowel: string;
  image_url: string;
  sound: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateCompleteTheWordMaster {
  game_id: string | Types.ObjectId;
  consonant: string;
  vowel: string;
  vowel_trap: string;
  position: string;
  order: number;
  image_url: string;
}

export interface UpdateCompleteTheWordMaster {
  consonant?: string;
  vowel?: string;
  image_url?: string;
  is_active?: boolean;
}
