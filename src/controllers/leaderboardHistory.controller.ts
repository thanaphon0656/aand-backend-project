import {
  Controller,
  UseBefore,
  Post,
  Req,
  Res,
} from "routing-controllers";
import { Request, Response } from "express";
import { ListLeaderboardHistoryDto, ScoreLeaderboardHistoryDto, AddLeaderboardScoreDto} from "../dtos/leaderboardHistory.dto";
import LeaderboardHistoryService from "../services/leaderboardHistory.service";
import validationMiddleware from "../middlewares/validation.middleware";
import decryptMiddleware from "../middlewares/decrypt.middleware";

@Controller("/leaderboard-history")
export default class LeaderboardHistoryController {
  public leaderboardHistoryService = new LeaderboardHistoryService();

  @Post("/list")
  @UseBefore(validationMiddleware(ListLeaderboardHistoryDto, "body"))
  @UseBefore(decryptMiddleware)
  async ListLeaderboardHistory(@Req() req: Request, @Res() res: Response) {
    try {
      console.log("list")
      const data: ListLeaderboardHistoryDto = req.body;
      const [status, result] = await this.leaderboardHistoryService.listLeaderboardHistory(data);

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
      const result = await this.leaderboardHistoryService.scoreLeaderboardHistory(data);

      return res.status(200).json({
        status: true,
        data: result,
      });
    } catch (error) {
      throw error
    }
  }

  @Post("/add")
  @UseBefore(validationMiddleware(AddLeaderboardScoreDto, "body"))
  @UseBefore(decryptMiddleware)
  async addLeaderboardScore(@Req() req: Request, @Res() res: Response) {
    try {
      const data: AddLeaderboardScoreDto = req.body;
      const [status, result] = await this.leaderboardHistoryService.addLeaderboardScore(data);
  
      return res.status(200).json({
        status,
        message: result,
      });
    } catch (error) {
      throw error;
    }
  }
  
}
