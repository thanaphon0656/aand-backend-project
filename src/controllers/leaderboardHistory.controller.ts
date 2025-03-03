import {
  Controller,
  UseBefore,
  Post,
  Req,
  Res,
} from "routing-controllers";
import { Request, Response } from "express";
import { AddLeaderboardHistoryDto, ListLeaderboardHistoryDto, ScoreLeaderboardHistoryDto } from "../dtos/leaderboardHistory.dto";
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
      const result = await this.leaderboardHistoryService.addLeaderboardHistory(data);

      return res.status(200).json({
        status: true,
        data: result,
      });
    } catch (error) {
      throw error
    }
  }

  @Post("/list")
  @UseBefore(validationMiddleware(ListLeaderboardHistoryDto, "body"))
  @UseBefore(decryptMiddleware)
  async ListLeaderboardHistory(@Req() req: Request, @Res() res: Response) {
    try {
      console.log("list")
      const data: ListLeaderboardHistoryDto = req.body;
      const [status, result] = await this.leaderboardHistoryService.ListLeaderboardHistory(data);

      return res.status(200).json({
        status: status,
        data: result,
      });
    } catch (error) {
      throw error
    }
  }

  @Post("/score")
  @UseBefore(validationMiddleware(ScoreLeaderboardHistoryDto, "body"))
  @UseBefore(decryptMiddleware)
  async ScoreLeaderboardHistory(@Req() req: Request, @Res() res: Response) {
    try {
      const data: ScoreLeaderboardHistoryDto = req.body;
      const result = await this.leaderboardHistoryService.ScoreLeaderboardHistory(data);

      return res.status(200).json({
        status: true,
        data: result,
      });
    } catch (error) {
      throw error
    }
  }
}
