import { Controller, UseBefore, Get, Post, Delete, Req, Res, Patch } from "routing-controllers";
import { Request, Response } from "express";
import { CreateLetterMatchWordsLevelDto, UpdateLetterMatchWordsLevelDto } from "./../../dtos/letterMatchWordsLevel.dto";
import LetterMatchWordsLevelService from "./../../services/letterMatchWordsLevel.service";
import validationMiddleware from "./../../middlewares/validation.middleware";

@Controller("/admin/letter-match-words-level")
export default class LetterMatchWordsLevelController {
  public letterMatchWordsLevelService = new LetterMatchWordsLevelService();

  @Post("/create")
  @UseBefore(validationMiddleware(CreateLetterMatchWordsLevelDto, "body"))
  async create(@Req() req: Request, @Res() res: Response) {
    try {
      const [status, result] = await this.letterMatchWordsLevelService.createLetterMatchWordsLevel(req.body);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Patch("/update/:id")
  @UseBefore(validationMiddleware(UpdateLetterMatchWordsLevelDto, "body"))
  async update(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, result] = await this.letterMatchWordsLevelService.updateLetterMatchWordsLevel(id, req.body);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/all")
  async getAll(@Res() res: Response) {
    try {
      const [status, result] = await this.letterMatchWordsLevelService.getAllLetterMatchWordsLevels();
      return res.status(200).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/detail/:id")
  async getById(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, result] = await this.letterMatchWordsLevelService.getLetterMatchWordsLevelById(id);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Delete("/delete/:id")
  async delete(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, message] = await this.letterMatchWordsLevelService.deleteLetterMatchWordsLevel(id);
      return res.status(status ? 200 : 400).json({ status, message });
    } catch (error) {
      throw error;
    }
  }
}
