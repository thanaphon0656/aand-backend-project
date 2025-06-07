import { Controller, UseBefore, Get, Post, Delete, Req, Res, Patch } from "routing-controllers";
import { Request, Response } from "express";
import { CreateLetterMatchWordsLevelDto, UpdateLetterMatchWordsLevelDto } from "./../../dtos/letterMatchWordsLevel.dto";
import LetterMatchWordsLevelService from "./../../services/letterMatchWordsLevel.service";
import validationMiddleware from "./../../middlewares/validation.middleware";
import authAdminMiddleware from "./../../middlewares/authAdmin.middleware";
import { PaginationV1WithSortSearchDto } from './../../dtos/utilities.dto';

@Controller("/admin/letter-match-words-level")
export default class LetterMatchWordsLevelController {
  public letterMatchWordsLevelService = new LetterMatchWordsLevelService();

  @Post("/create")
  @UseBefore(authAdminMiddleware)
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
  @UseBefore(authAdminMiddleware)
  @UseBefore(validationMiddleware(UpdateLetterMatchWordsLevelDto, "params"))
  async update(@Req() req: Request, @Res() res: Response) {
    try {
      const id: string = req.params.id;
      const data = req.body;
      
      if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ status: false, message: "No data provided for update." });
      }
      const [status, result] = await this.letterMatchWordsLevelService.updateLetterMatchWordsLevel(id, req.body);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/all")
  @UseBefore(authAdminMiddleware)
  async getAll(@Res() res: Response) {
    try {
      const [status, result] = await this.letterMatchWordsLevelService.getAllLetterMatchWordsLevels();
      return res.status(200).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/detail/:id")
  @UseBefore(authAdminMiddleware)
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
  @UseBefore(authAdminMiddleware)
  async delete(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, message] = await this.letterMatchWordsLevelService.deleteLetterMatchWordsLevel(id);
      return res.status(status ? 200 : 400).json({ status, message });
    } catch (error) {
      throw error;
    }
  }

  @Post("/list")
  @UseBefore(authAdminMiddleware)
  @UseBefore(validationMiddleware(PaginationV1WithSortSearchDto, 'body'))
  async listLetterMatchWordsLevel(@Req() req: any, @Res() res: Response) {
    try {
      const pagination: PaginationV1WithSortSearchDto = req.body;
      const results: Array<any> = await this.letterMatchWordsLevelService.listLetterMatchWordsLevel(pagination);
      return res.status(200).json(results);
    } catch (error) {
      throw error;
    }
  }
}
