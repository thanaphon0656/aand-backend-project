import { model, Schema, Document } from "mongoose";
import { Player } from "./../interfaces/player.interface";

const playerSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
    },
    facebook_access_token: {
      type: String,
      default: null,
    },
    google_access_token: {
      type: String,
      default: null,
    },
    apple_access_token: {
      type: String,
      default: null,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
    updated_at: {
      type: Date,
      default: Date.now(),
    },
  }
);

const playerModel = model<Player & Document>("Player", playerSchema);

export default playerModel;
