import {
  Controller,
  UseBefore,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  Res,
} from "routing-controllers";
import { Request, Response, NextFunction } from "express";
import {
  CreateAdminDto,
} from "@/dtos/admin.dto";
import adminService from "@services/admin.service";
import authMiddleware from "@middlewares/auth.middleware";
import validationMiddleware from "@middlewares/validation.middleware";
import roleMiddleware from "@middlewares/role.middleware";
@Controller("/admin/register")
@UseBefore(roleMiddleware)
export default class AdminController {
  public adminService = new adminService();

  @Post('/create')
  @UseBefore(authMiddleware)
  @UseBefore(validationMiddleware(CreateAdminDto, 'body'))
  async createSkillMasterData(@Req() req: Request, @Res() res: Response) {
    try {
      const data: any = req.body;
      const [result, message] = await this.adminService.createAdmin(data);
      return res.status(200).json({ status: result, message });
    } catch (err: any) {
      throw err;
    }
  }
}
