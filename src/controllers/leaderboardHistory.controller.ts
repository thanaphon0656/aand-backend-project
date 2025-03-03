import {
  Controller,
  UseBefore,
  Post,
  Req,
  Res,
} from "routing-controllers";
import { Request, Response } from "express";
import { AddLeaderboardHistoryDto } from "../dtos/leaderboardHistory.dto";
import LeaderboardHistoryService from "../services/leaderboardHistory.service";
import validationMiddleware from "../middlewares/validation.middleware";
import decryptMiddleware from "../middlewares/decrypt.middleware";

@Controller("/leaderboard-history")
export default class LeaderboardHistoryController {
  public leaderboardHistoryService = new LeaderboardHistoryService();

  @Post("/add")
  @UseBefore(validationMiddleware(AddLeaderboardHistoryDto, "body"))
  @UseBefore(decryptMiddleware)
  async addLeaderboardHistory(@Req() req: Request, @Res() res: Response) {
    try {
      const data: AddLeaderboardHistoryDto = req.body;
      const result = await this.leaderboardHistoryService.addHistory(data);

      return res.status(200).json({
        status: true,
        data: result,
      });
    } catch (error) {
      throw error
    }
  }
}
