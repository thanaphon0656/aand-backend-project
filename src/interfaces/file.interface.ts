import { Types } from "mongoose";

export interface File {
  _id?: Types.ObjectId;
  key: string;
  bucket: string;
  location: string;
  version_id?: string;
  folder_id: Types.ObjectId;
  media_type: string;
  file_extension: string;
  created_at: Date;
  updated_at: Date;
}