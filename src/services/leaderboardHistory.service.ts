import MainService from "./../services/main.service";
import { HttpException } from "../exceptions/HttpException";
import { Types } from "mongoose";

export default class LeaderboardHistoryService extends MainService {
  constructor() {
    super();
  }

  public async addLeaderboardHistory(data: any): Promise<any> {
    if (data.api_key !== process.env.API_KEY) {
      throw new HttpException(400, 'API key is not found');
    }
    const player = await this.model.player.findById(data.player_id)
    if (!player) {
      throw new HttpException(400, "Player not found.");
    }
    const game = await this.model.games.findById(data.game_id)
    if (!game) {
      throw new HttpException(400, "Game not found.");
    }

    if (data.score <= 0) {
      throw new HttpException(400, "Score must be greater than 0");
    }

    const newHistory = await this.model.leaderboardHistory.create(data);

    return {
      _id: newHistory._id,
      player_id: newHistory.player_id,
      game_id: newHistory.game_id,
      level_id: newHistory.level_id,
      score: newHistory.score,
      created_at: newHistory.created_at,
    };
  }

  public async ListLeaderboardHistory(data: any): Promise<any> {
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

  public async ScoreLeaderboardHistory(data: any): Promise<any> {
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
}
