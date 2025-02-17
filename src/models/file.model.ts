import { model, Schema, Document, Types } from "mongoose";
import { File } from "../interfaces/file.interface";

const fileSchema: Schema = new Schema({
  key: {
    type: String,
    required: true,
  },
  bucket: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  version_id: {
    type: String,
    required: false,
  },
  folder_id: {
    type: Types.ObjectId,
    ref: "folder",
    required: true,
  },
  media_type: {
    type: String,
    required: true,
  },
  file_extension: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const FileModel = model<File & Document>(
  "file",
  fileSchema
);

export default FileModel;