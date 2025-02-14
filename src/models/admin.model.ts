import { model, Schema, Document } from "mongoose";
import { Admin } from "./../interfaces/admin.interface";

const adminSchema: Schema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
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

const adminModel = model<Admin & Document>(
  "admin",
  adminSchema
);

export default adminModel;
