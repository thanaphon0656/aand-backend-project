import {
  Controller,
  UseBefore,
  Get,
  Post,
  Delete,
  Req,
  Res,
  Patch
} from "routing-controllers";
import { Request, Response, NextFunction } from "express";
import {
  CreateGamesAdminDto,
  ParamUpdateGamesAdminDto,
  ParamDetailGamesAdminDto,
  ParamDeleteGamesAdminDto
} from "@/dtos/games.dto";
import GamesService from "@services/games.service";
import authAdminMiddleware from "@middlewares/authAdmin.middleware";
import { RequestWithAdmin } from "@interfaces/auth.interface";
import validationMiddleware from "@middlewares/validation.middleware";

@Controller("/admin/games")
export default class AdminController {
  public gamesService = new GamesService();

  @Post('/create')
  @UseBefore(validationMiddleware(CreateGamesAdminDto, 'body'))
  async createGamesAdmin(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const [status, result] = await this.gamesService.createGamesAdmin(data);
      return res.status(200).json({ status: status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Patch('/update/:id')
  @UseBefore(validationMiddleware(ParamUpdateGamesAdminDto, 'params'))
  async updateGamesAdmin(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const id: string = req.params.id;
      const data = req.body;

      if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ status: false, message: "No data provided for update." });
      }

      const [status, result] = await this.gamesService.updateGamesAdmin(id, data);
      return res.status(status ? 200 : 400).json({ status: status, data: result });
    } catch (error) {
      throw error;
    }
  }


  @Get('/all')
  @UseBefore(authAdminMiddleware)
  async getAllAdmin(@Res() res: Response, next: NextFunction) {
    try {
      const [status, result] = await this.gamesService.getAllGamesAdmin();
      return res.status(200).json({ status: status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get('/detail/:id')
  @UseBefore(authAdminMiddleware)
  @UseBefore(validationMiddleware(ParamDetailGamesAdminDto, 'params'))
  async getAdminDetail(@Req() req: RequestWithAdmin, @Res() res: Response, next: NextFunction) {
    try {
      const id: string = req.params.id;

      const [status, result] = await this.gamesService.getGameDetailById(id);

      if (!status) {
        return res.status(400).json({ status: false, message: result });
      }

      return res.status(200).json({ status: true, data: result });

    } catch (error) {
      throw error;
    }
  }

  @Delete('/delete/:id')
  @UseBefore(authAdminMiddleware)
  @UseBefore(validationMiddleware(ParamDeleteGamesAdminDto, 'params'))
  async deleteGamesAdmin(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const id: string = req.params.id;

      const [result, message] = await this.gamesService.deleteGamesAdmin(id);

      return res.status(result ? 200 : 400).json({ status: result, message });
    } catch (error) {
      throw error;
    }
  }

}