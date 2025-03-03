import MainService from "./../services/main.service";
import { HttpException } from "../exceptions/HttpException";
import LeaderboardHistoryModel from "../models/leaderboardHistory.model";

export default class LeaderboardHistoryService extends MainService {
  constructor() {
    super();
  }

  public async addHistory(data: any): Promise<any> {
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

    const newHistory = await LeaderboardHistoryModel.create(data);

    return {
      _id: newHistory._id,
      player_id: newHistory.player_id,
      game_id: newHistory.game_id,
      level_id: newHistory.level_id,
      score: newHistory.score,
      created_at: newHistory.created_at,
    };
  }
}
