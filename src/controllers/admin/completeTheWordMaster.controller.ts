import { Controller, UseBefore, Get, Post, Delete, Req, Res, Patch } from "routing-controllers";
import { Request, Response } from "express";
import { CreateCompleteTheWordMasterDto, UpdateCompleteTheWordMasterDto } from "./../../dtos/completeTheWordMaster.dto";
import CompleteTheWordMasterService from "./../../services/completeTheWordMaster.service";
import validationMiddleware from "./../../middlewares/validation.middleware";

@Controller("/admin/complete-the-word-master")
export default class CompleteTheWordMasterController {
  public completeTheWordMasterService = new CompleteTheWordMasterService();

  @Post("/create")
  @UseBefore(validationMiddleware(CreateCompleteTheWordMasterDto, "body"))
  async create(@Req() req: Request, @Res() res: Response) {
    try {
      const [status, result] = await this.completeTheWordMasterService.createCompleteTheWordMaster(req.body);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Patch("/update/:id")
  @UseBefore(validationMiddleware(UpdateCompleteTheWordMasterDto, "body"))
  async update(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, result] = await this.completeTheWordMasterService.updateCompleteTheWordMaster(id, req.body);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/all")
  async getAll(@Res() res: Response) {
    try {
      const [status, result] = await this.completeTheWordMasterService.getAllCompleteTheWordMasters();
      return res.status(200).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/detail/:id")
  async getById(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, result] = await this.completeTheWordMasterService.getCompleteTheWordMasterById(id);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Delete("/delete/:id")
  async delete(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, message] = await this.completeTheWordMasterService.deleteCompleteTheWordMaster(id);
      return res.status(status ? 200 : 400).json({ status, message });
    } catch (error) {
      throw error;
    }
  }
}
