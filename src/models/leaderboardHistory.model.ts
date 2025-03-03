import { model, Schema, Document, Types } from "mongoose";
import { LeaderboardHistory } from "./../interfaces/leaderboardHistory.interface";

const leaderboardHistorySchema: Schema = new Schema(
  {
    player_id: {
      type: Types.ObjectId,
      ref: "player",
      required: true,
    },
    game_id: {
      type: Types.ObjectId,
      ref: "game",
      required: true,
    },
    level_id: {
      type: Types.ObjectId,
      required: true,
    },
    score: {
      type: Number,
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
  }
);

const LeaderboardHistoryModel = model<LeaderboardHistory & Document>(
  "leaderboard_history",
  leaderboardHistorySchema
);

export default LeaderboardHistoryModel;
