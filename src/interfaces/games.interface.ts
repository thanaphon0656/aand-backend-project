import mongoose from "mongoose";

export interface Games {
  _id: string | mongoose.Types.ObjectId;
  name_th: string;
  name_en: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateGamesAdmin {
  name_th: string;
  name_en: string;
  description: string;
}

export interface UpdateGamesAdmin {
  name_th: string;
  name_en: string;
  description: string;
}