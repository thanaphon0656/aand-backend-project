import { Controller, UseBefore, Get, Post, Delete, Req, Res, Patch } from "routing-controllers";
import { Request, Response } from "express";
import { CreateWordChoiceLevelDto, UpdateWordChoiceLevelDto } from "./../../dtos/wordChoiceLevel.dto";
import WordChoiceLevelService from "./../../services/wordChoiceLevel.service";
import validationMiddleware from "./../../middlewares/validation.middleware";

@Controller("/admin/word-choice-level")
export default class WordChoiceLevelController {
  public wordChoiceLevelService = new WordChoiceLevelService();

  @Post("/create")
  @UseBefore(validationMiddleware(CreateWordChoiceLevelDto, "body"))
  async create(@Req() req: Request, @Res() res: Response) {
    try {
      const [status, result] = await this.wordChoiceLevelService.createWordChoiceLevel(req.body);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Patch("/update/:id")
  @UseBefore(validationMiddleware(UpdateWordChoiceLevelDto, "params"))
  async update(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, result] = await this.wordChoiceLevelService.updateWordChoiceLevel(id, req.body);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/all")
  async getAll(@Res() res: Response) {
    try {
      const [status, result] = await this.wordChoiceLevelService.getAllWordChoiceLevels();
      return res.status(200).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/detail/:id")
  async getById(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, result] = await this.wordChoiceLevelService.getWordChoiceLevelById(id);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Delete("/delete/:id")
  async delete(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, message] = await this.wordChoiceLevelService.deleteWordChoiceLevel(id);
      return res.status(status ? 200 : 400).json({ status, message });
    } catch (error) {
      throw error;
    }
  }
}
