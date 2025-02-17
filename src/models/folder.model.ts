import { model, Schema, Document } from "mongoose";
import { Folder } from "../interfaces/folder.interface";

const folderSchema: Schema = new Schema({
  name: {
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

const FolderModel = model<Folder & Document>(
  "folder",
  folderSchema
);

export default FolderModel;