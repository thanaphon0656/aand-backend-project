import MainService from "./../services/main.service";
import { HttpException } from "../exceptions/HttpException";
import { Types } from "mongoose";

export default class LeaderboardHistoryService extends MainService {
  constructor() {
    super();
  }

  public async listLeaderboardHistory(data: any): Promise<any> {
    if (data.api_key !== process.env.API_KEY) {
      throw new HttpException(400, 'API key is not found');
    }
    const player = await this.model.player.findById(data.player_id)
    if (!player) {
      throw new HttpException(400, "Player not found.");
    }
    if (data.game_id) {
      const game = await this.model.games.findById(data.game_id)
      if (!game) {
        throw new HttpException(400, "Game not found.");
      }
    }

    const query: any = { player_id: new Types.ObjectId(data.player_id) };
    if (data.game_id) {
      query.game_id = new Types.ObjectId(data.game_id);
    }

    const history = await this.model.leaderboardHistory.find(query);
    return [true, history];
  }

  public async scoreLeaderboardHistory(data: any): Promise<any> {
    if (data.api_key !== process.env.API_KEY) {
      throw new HttpException(400, 'API key is not found');
    }

    const player = await this.model.player.findById(data.player_id)
    if (!player) {
      throw new HttpException(400, "Player not found.");
    }
    if (data.game_id) {
      const game = await this.model.games.findById(data.game_id)
      if (!game) {
        throw new HttpException(400, "Game not found.");
      }
    }

    const query: any = { player_id: new Types.ObjectId(data.player_id) };
    if (data.game_id) {
      query.game_id = new Types.ObjectId(data.game_id);
    }

    const result = await this.model.leaderboardHistory.aggregate([
      { $match: query },
      { $group: { _id: null, score: { $sum: "$score" } } }
    ]);

    return {
      player_id: data.player_id,
      game_id: data.game_id || null,
      total_score: result.length > 0 ? result[0].score : 0
    };
  }

  public async addLeaderboardScore(data: any): Promise<any> {
    if (data.api_key !== process.env.API_KEY) {
      return [false, 'API key is not found'];
    }
  
    const player = await this.model.player.findById(data.player_id);
    if (!player) {
      return [false, "Player not found"];
    }
  
    const game = await this.model.games.findById(data.game_id);
    if (!game) {
      return [false, "Game not found"];
    }
  
    const score = Number(data.score);
    if (isNaN(score) || score <= 0) {
      return [false, "Invalid or zero score. No action taken."];
    }
  
    const query = {
      player_id: new Types.ObjectId(data.player_id),
      game_id: new Types.ObjectId(data.game_id),
      level_id: data.level_id ? new Types.ObjectId(data.level_id) : null,
    };
  
    // 🔍 เช็คคะแนนปัจจุบัน
    const existing = await this.model.leaderboardHistory.findOne(query);
  
    if (data.change_type === 'decrease') {
      if (!existing || existing.score <= 0) {
        return [true, "Update score successful"];
      }
      
      if (score > existing.score) {
        await this.model.leaderboardHistory.findOneAndUpdate(
          query,
          { $set: { score: 0 } },
          { new: true }
        );
        return [true, "Update score successful"];
      }
    }
  
    const update = {
      $inc: {
        score: data.change_type === 'decrease' ? -score : score
      },
      $setOnInsert: {
        created_at: new Date(),
      },
      $set: {
        updated_at: new Date()
      }
    };
  
    const options = { upsert: true, new: true };
  
    await this.model.leaderboardHistory.findOneAndUpdate(
      query,
      update,
      options
    );
  
    return [true, "Update score successful"];
  }
  
}
