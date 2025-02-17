import { Controller, UseBefore, Get, Post, Delete, Req, Res, Patch } from "routing-controllers";
import { Request, Response } from "express";
import { CreateCompleteTheWordLevelDto, UpdateCompleteTheWordLevelDto } from "./../../dtos/completeTheWordLevel.dto";
import CompleteTheWordLevelService from "./../../services/completeTheWordLevel.service";
import validationMiddleware from "./../../middlewares/validation.middleware";

@Controller("/admin/complete-the-word-level")
export default class CompleteTheWordLevelController {
  public completeTheWordLevelService = new CompleteTheWordLevelService();

  @Post("/create")
  @UseBefore(validationMiddleware(CreateCompleteTheWordLevelDto, "body"))
  async create(@Req() req: Request, @Res() res: Response) {
    try {
      const [status, result] = await this.completeTheWordLevelService.createCompleteTheWordLevel(req.body);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Patch("/update/:id")
  @UseBefore(validationMiddleware(UpdateCompleteTheWordLevelDto, "body"))
  async update(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, result] = await this.completeTheWordLevelService.updateCompleteTheWordLevel(id, req.body);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/all")
  async getAll(@Res() res: Response) {
    try {
      const [status, result] = await this.completeTheWordLevelService.getAllCompleteTheWordLevels();
      return res.status(200).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/detail/:id")
  async getById(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, result] = await this.completeTheWordLevelService.getCompleteTheWordLevelById(id);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Delete("/delete/:id")
  async delete(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, message] = await this.completeTheWordLevelService.deleteCompleteTheWordLevel(id);
      return res.status(status ? 200 : 400).json({ status, message });
    } catch (error) {
      throw error;
    }
  }
}
