import {
  Controller,
  UseBefore,
  Get,
  Post,
  Delete,
  Req,
  Res,
  Patch,
} from "routing-controllers";
import { Request, Response, NextFunction } from "express";
import {
  CreateLearnToWriteMasterDto,
  ParamUpdateLearnToWriteMasterDto,
  ParamDetailLearnToWriteMasterDto,
  ParamDeleteLearnToWriteMasterDto,
} from "./../../dtos/learnToWriteMaster.dto";
import LearnToWriteMasterService from "./../../services/learnToWriteMaster.service";
import authAdminMiddleware from "./../../middlewares/authAdmin.middleware";
import validationMiddleware from "./../../middlewares/validation.middleware";

@Controller("/admin/learn-to-write-master")
export default class LearnToWriteMasterController {
  public learnToWriteMasterService = new LearnToWriteMasterService();

  @Post("/create")
  @UseBefore(validationMiddleware(CreateLearnToWriteMasterDto, "body"))
  async createLearnToWriteMaster(
    @Req() req: Request,
    @Res() res: Response,
    next: NextFunction
  ) {
    try {
      const data = req.body;
      const [status, result] = await this.learnToWriteMasterService.createLearnToWriteMaster(data);
      return res.status(200).json({ status: status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Patch("/update/:id")
  @UseBefore(validationMiddleware(ParamUpdateLearnToWriteMasterDto, "params"))
  async updateLearnToWriteMaster(
    @Req() req: Request,
    @Res() res: Response,
    next: NextFunction
  ) {
    try {
      const id: string = req.params.id;
      const data = req.body;
      
      if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ status: false, message: "No data provided for update." });
      }

      const [status, result] = await this.learnToWriteMasterService.updateLearnToWriteMaster(id, data);
      return res.status(status ? 200 : 400).json({ status: status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/all")
  @UseBefore(authAdminMiddleware)
  async getAllLearnToWriteMaster(@Res() res: Response, next: NextFunction) {
    try {
      const [status, result] = await this.learnToWriteMasterService.getAllLearnToWriteMaster();
      return res.status(200).json({ status: status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/detail/:id")
  @UseBefore(authAdminMiddleware)
  @UseBefore(validationMiddleware(ParamDetailLearnToWriteMasterDto, "params"))
  async getLearnToWriteMasterById(
    @Req() req: Request,
    @Res() res: Response,
    next: NextFunction
  ) {
    try {
      const id: string = req.params.id;
      const [status, result] = await this.learnToWriteMasterService.getLearnToWriteMasterById(id);

      if (!status) {
        return res.status(400).json({ status: false, message: result });
      }

      return res.status(200).json({ status: true, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Delete("/delete/:id")
  @UseBefore(authAdminMiddleware)
  @UseBefore(validationMiddleware(ParamDeleteLearnToWriteMasterDto, "params"))
  async deleteLearnToWriteMaster(
    @Req() req: Request,
    @Res() res: Response,
    next: NextFunction
  ) {
    try {
      const id: string = req.params.id;
      const [status, message] = await this.learnToWriteMasterService.deleteLearnToWriteMaster(id);
      return res.status(status ? 200 : 400).json({ status: status, message });
    } catch (error) {
      throw error;
    }
  }
}