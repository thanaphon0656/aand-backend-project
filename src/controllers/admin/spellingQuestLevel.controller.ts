import { Controller, UseBefore, Get, Post, Delete, Req, Res, Patch } from "routing-controllers";
import { Request, Response } from "express";
import { CreateSpellingQuestLevelDto, UpdateSpellingQuestLevelDto } from "./../../dtos/spellingQuestLevel.dto";
import SpellingQuestLevelService from "./../../services/spellingQuestLevel.service";
import validationMiddleware from "./../../middlewares/validation.middleware";

@Controller("/admin/spelling-quest-level")
export default class SpellingQuestLevelController {
  public spellingQuestLevelService = new SpellingQuestLevelService();

  @Post("/create")
  @UseBefore(validationMiddleware(CreateSpellingQuestLevelDto, "body"))
  async create(@Req() req: Request, @Res() res: Response) {
    try {
      const [status, result] = await this.spellingQuestLevelService.createSpellingQuestLevel(req.body);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Patch("/update/:id")
  @UseBefore(validationMiddleware(UpdateSpellingQuestLevelDto, "body"))
  async update(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, result] = await this.spellingQuestLevelService.updateSpellingQuestLevel(id, req.body);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/all")
  async getAll(@Res() res: Response) {
    try {
      const [status, result] = await this.spellingQuestLevelService.getAllSpellingQuestLevels();
      return res.status(200).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/detail/:id")
  async getById(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, result] = await this.spellingQuestLevelService.getSpellingQuestLevelById(id);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Delete("/delete/:id")
  async delete(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, message] = await this.spellingQuestLevelService.deleteSpellingQuestLevel(id);
      return res.status(status ? 200 : 400).json({ status, message });
    } catch (error) {
      throw error;
    }
  }
}
