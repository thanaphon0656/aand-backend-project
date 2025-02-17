import {
  Controller,
  UseBefore,
  Get,
  Post,
  Delete,
  Req,
  Res,
  Patch,
} from "routing-controllers";
import { Request, Response, NextFunction } from "express";
import {
  CreateSpellingQuestMasterDto,
  ParamUpdateSpellingQuestMasterDto,
  ParamDetailSpellingQuestMasterDto,
  ParamDeleteSpellingQuestMasterDto,
} from "./../../dtos/spellingQuestMaster.dto";
import SpellingQuestMasterService from "./../../services/spellingQuestMaster.service";
import authAdminMiddleware from "./../../middlewares/authAdmin.middleware";
import validationMiddleware from "./../../middlewares/validation.middleware";

@Controller("/admin/spelling-quest-master")
export default class SpellingQuestMasterController {
  public spellingQuestMasterService = new SpellingQuestMasterService();

  @Post("/create")
  @UseBefore(validationMiddleware(CreateSpellingQuestMasterDto, "body"))
  async createSpellingQuestMaster(
    @Req() req: Request,
    @Res() res: Response,
    next: NextFunction
  ) {
    try {
      const data = req.body;
      const [status, result] = await this.spellingQuestMasterService.createSpellingQuestMaster(data);
      return res.status(200).json({ status: status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Patch("/update/:id")
  @UseBefore(validationMiddleware(ParamUpdateSpellingQuestMasterDto, "params"))
  async updateSpellingQuestMaster(
    @Req() req: Request,
    @Res() res: Response,
    next: NextFunction
  ) {
    try {
      const id: string = req.params.id;
      const data = req.body;
      
      if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ status: false, message: "No data provided for update." });
      }

      const [status, result] = await this.spellingQuestMasterService.updateSpellingQuestMaster(id, data);
      return res.status(status ? 200 : 400).json({ status: status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/all")
  @UseBefore(authAdminMiddleware)
  async getAllSpellingQuestMasters(@Res() res: Response, next: NextFunction) {
    try {
      const [status, result] = await this.spellingQuestMasterService.getAllSpellingQuestMasters();
      return res.status(200).json({ status: status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/detail/:id")
  @UseBefore(authAdminMiddleware)
  @UseBefore(validationMiddleware(ParamDetailSpellingQuestMasterDto, "params"))
  async getSpellingQuestMasterById(
    @Req() req: Request,
    @Res() res: Response,
    next: NextFunction
  ) {
    try {
      const id: string = req.params.id;
      const [status, result] = await this.spellingQuestMasterService.getSpellingQuestMasterById(id);

      if (!status) {
        return res.status(400).json({ status: false, message: result });
      }

      return res.status(200).json({ status: true, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Delete("/delete/:id")
  @UseBefore(authAdminMiddleware)
  @UseBefore(validationMiddleware(ParamDeleteSpellingQuestMasterDto, "params"))
  async deleteSpellingQuestMaster(
    @Req() req: Request,
    @Res() res: Response,
    next: NextFunction
  ) {
    try {
      const id: string = req.params.id;
      const [status, message] = await this.spellingQuestMasterService.deleteSpellingQuestMaster(id);
      return res.status(status ? 200 : 400).json({ status: status, message });
    } catch (error) {
      throw error;
    }
  }
}