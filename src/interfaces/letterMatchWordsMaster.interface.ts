import { Types } from "mongoose";

export interface LetterMatchWordsMaster {
  _id?: string | Types.ObjectId;
  game_id: string | Types.ObjectId;
  word: string;
  phonetics: string[];
  color: string;
  image_url: string;
  category: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateLetterMatchWordsMaster {
  game_id: string | Types.ObjectId;
  word: string;
  phonetics: string[];
  color: string;
  image_url: string;
  category: string;
}

export interface UpdateLetterMatchWordsMaster {
  word?: string;
  phonetics?: string[];
  color?: string;
  image_url?: string;
  category?: string;
  is_active?: boolean;
}
