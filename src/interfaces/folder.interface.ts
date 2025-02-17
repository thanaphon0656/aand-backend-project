import { Types } from "mongoose";

export interface Folder {
  _id?: Types.ObjectId;
  name: string;
  created_at: Date;
  updated_at: Date;
}