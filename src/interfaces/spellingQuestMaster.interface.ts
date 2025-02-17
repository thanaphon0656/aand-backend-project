import { Types } from "mongoose";

export interface SpellingQuestMaster {
  _id?: string | Types.ObjectId;
  game_id: string | Types.ObjectId;
  word: string;
  phonetics: string[];
  image_url: string;
  category: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateSpellingQuestMaster {
  game_id: string;
  word: string;
  phonetics: string[];
  image_url: string;
  category: string;
}

export interface UpdateSpellingQuestMaster {
  word?: string;
  phonetics?: string[];
  image_url?: string;
  category?: string;
  is_active?: boolean;
}
