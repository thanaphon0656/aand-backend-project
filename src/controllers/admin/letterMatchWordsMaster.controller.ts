import { Controller, UseBefore, Get, Post, Delete, Req, Res, Patch } from "routing-controllers";
import { Request, Response } from "express";
import { CreateLetterMatchWordsMasterDto, UpdateLetterMatchWordsMasterDto } from "./../../dtos/letterMatchWordsMaster.dto";
import LetterMatchWordsMasterService from "./../../services/letterMatchWordsMaster.service";
import validationMiddleware from "./../../middlewares/validation.middleware";

@Controller("/admin/letter-match-words-master")
export default class LetterMatchWordsMasterController {
  public letterMatchWordsMasterService = new LetterMatchWordsMasterService();

  @Post("/create")
  @UseBefore(validationMiddleware(CreateLetterMatchWordsMasterDto, "body"))
  async create(@Req() req: Request, @Res() res: Response) {
    try {
      const [status, result] = await this.letterMatchWordsMasterService.createLetterMatchWordsMaster(req.body);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Patch("/update/:id")
  @UseBefore(validationMiddleware(UpdateLetterMatchWordsMasterDto, "body"))
  async update(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, result] = await this.letterMatchWordsMasterService.updateLetterMatchWordsMaster(id, req.body);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/all")
  async getAll(@Res() res: Response) {
    try {
      const [status, result] = await this.letterMatchWordsMasterService.getAllLetterMatchWordsMasters();
      return res.status(200).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/detail/:id")
  async getById(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, result] = await this.letterMatchWordsMasterService.getLetterMatchWordsMasterById(id);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Delete("/delete/:id")
  async delete(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, message] = await this.letterMatchWordsMasterService.deleteLetterMatchWordsMaster(id);
      return res.status(status ? 200 : 400).json({ status, message });
    } catch (error) {
      throw error;
    }
  }
}
