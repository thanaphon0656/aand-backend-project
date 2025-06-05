import { Controller, UseBefore, Get, Post, Delete, Req, Res, Patch } from "routing-controllers";
import { Request, Response } from "express";
import { 
  CreateLearnToWriteLevelDto, 
  UpdateLearnToWriteLevelDto 
} from "./../../dtos/learnToWriteLevel.dto";
import LearnToWriteLevelService from "./../../services/learnToWriteLevel.service";
import validationMiddleware from "./../../middlewares/validation.middleware";
import authAdminMiddleware from "./../../middlewares/authAdmin.middleware";
import { PaginationV1WithSortSearchDto } from './../../dtos/utilities.dto';

@Controller("/admin/learn-to-write-level")
export default class LearnToWriteLevelController {
  public learnToWriteLevelService = new LearnToWriteLevelService();

  @Post("/create")
  @UseBefore(authAdminMiddleware)
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
  @UseBefore(authAdminMiddleware)
  @UseBefore(validationMiddleware(UpdateLearnToWriteLevelDto, "params"))
  async update(@Req() req: Request, @Res() res: Response) {
    try {
      const id: string = req.params.id;
      const data = req.body;
      
      if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ status: false, message: "No data provided for update." });
      }
      const [status, result] = await this.learnToWriteLevelService.updateLearnToWriteLevel(id, req.body);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/all")
  @UseBefore(authAdminMiddleware)
  async getAll(@Res() res: Response) {
    try {
      const [status, result] = await this.learnToWriteLevelService.getAllLearnToWriteLevels();
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
      const [status, result] = await this.learnToWriteLevelService.getLearnToWriteLevelById(id);
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
      const [status, message] = await this.learnToWriteLevelService.deleteLearnToWriteLevel(id);
      return res.status(status ? 200 : 400).json({ status, message });
    } catch (error) {
      throw error;
    }
  }

  @Post("/list")
  @UseBefore(authAdminMiddleware)
  @UseBefore(validationMiddleware(PaginationV1WithSortSearchDto, 'body'))
  async listLearnToWriteLevel(@Req() req: any, @Res() res: Response) {
    try {
      const pagination: PaginationV1WithSortSearchDto = req.body;
      const results: Array<any> = await this.learnToWriteLevelService.listLearnToWriteLevel(pagination);
      return res.status(200).json(results);
    } catch (error) {
      throw error;
    }
  }
}
