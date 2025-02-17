import { Types } from "mongoose";

export interface CharacterPuzzleMaster {
  _id?: string | Types.ObjectId;
  game_id: string | Types.ObjectId;
  letter: string;
  image_url: string;
  type: string; // พยัญชนะ, สระ, วรรณยุกต์
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateCharacterPuzzleMaster {
  game_id: string | Types.ObjectId;
  letter: string;
  image_url: string;
  type: string;
}

export interface UpdateCharacterPuzzleMaster {
  letter?: string;
  image_url?: string;
  type?: string;
  is_active?: boolean;
}
