import { model, Schema, Document } from "mongoose";
import { Folder } from "./../interfaces/folder.interface";

const folderSchema: Schema = new Schema({
  name: {
    type: String,
    require: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

const folderModel = model<Folder & Document>(
  "folder",
  folderSchema
);

export default folderModel;
