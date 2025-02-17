import { Controller, UseBefore, Get, Post, Delete, Req, Res, Patch } from "routing-controllers";
import { Request, Response } from "express";
import { 
  CreateLearnToWriteLevelDto, 
  UpdateLearnToWriteLevelDto 
} from "./../../dtos/learnToWriteLevel.dto";
import LearnToWriteLevelService from "./../../services/learnToWriteLevel.service";
import validationMiddleware from "./../../middlewares/validation.middleware";

@Controller("/admin/learn-to-write-level")
export default class LearnToWriteLevelController {
  public learnToWriteLevelService = new LearnToWriteLevelService();

  @Post("/create")
  @UseBefore(validationMiddleware(CreateLearnToWriteLevelDto, "body"))
  async create(@Req() req: Request, @Res() res: Response) {
    try {
      const [status, result] = await this.learnToWriteLevelService.createLearnToWriteLevel(req.body);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Patch("/update/:id")
  @UseBefore(validationMiddleware(UpdateLearnToWriteLevelDto, "body"))
  async update(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, result] = await this.learnToWriteLevelService.updateLearnToWriteLevel(id, req.body);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/all")
  async getAll(@Res() res: Response) {
    try {
      const [status, result] = await this.learnToWriteLevelService.getAllLearnToWriteLevels();
      return res.status(200).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/detail/:id")
  async getById(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, result] = await this.learnToWriteLevelService.getLearnToWriteLevelById(id);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Delete("/delete/:id")
  async delete(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, message] = await this.learnToWriteLevelService.deleteLearnToWriteLevel(id);
      return res.status(status ? 200 : 400).json({ status, message });
    } catch (error) {
      throw error;
    }
  }
}
