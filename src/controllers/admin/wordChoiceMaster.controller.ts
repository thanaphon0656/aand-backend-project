import { Controller, UseBefore, Get, Post, Delete, Req, Res, Patch } from "routing-controllers";
import { Request, Response } from "express";
import { CreateWordChoiceMasterDto, UpdateWordChoiceMasterDto } from "./../../dtos/wordChoiceMaster.dto";
import WordChoiceMasterService from "./../../services/wordChoiceMaster.service";
import validationMiddleware from "./../../middlewares/validation.middleware";

@Controller("/admin/word-choice-master")
export default class WordChoiceMasterController {
  public wordChoiceMasterService = new WordChoiceMasterService();

  @Post("/create")
  @UseBefore(validationMiddleware(CreateWordChoiceMasterDto, "body"))
  async create(@Req() req: Request, @Res() res: Response) {
    try {
      console.log("xxxxx")
      const [status, result] = await this.wordChoiceMasterService.createWordChoiceMaster(req.body);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Patch("/update/:id")
  @UseBefore(validationMiddleware(UpdateWordChoiceMasterDto, "body"))
  async update(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, result] = await this.wordChoiceMasterService.updateWordChoiceMaster(id, req.body);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/all")
  async getAll(@Res() res: Response) {
    try {
      const [status, result] = await this.wordChoiceMasterService.getAllWordChoiceMasters();
      return res.status(200).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/detail/:id")
  async getById(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, result] = await this.wordChoiceMasterService.getWordChoiceMasterById(id);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Delete("/delete/:id")
  async delete(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, message] = await this.wordChoiceMasterService.deleteWordChoiceMaster(id);
      return res.status(status ? 200 : 400).json({ status, message });
    } catch (error) {
      throw error;
    }
  }
}
