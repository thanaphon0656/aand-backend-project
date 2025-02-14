import {
  Controller,
  UseBefore,
  Get,
  Post,
  Delete,
  Req,
  Res,
} from "routing-controllers";
import { Request, Response, NextFunction } from "express";
import {
  CreateAdminDto,
  LoginAdminDto,
  DeleteAdminDto
} from "@/dtos/admin.dto";
import AdminService from "@services/admin.service";
import authAdminMiddleware from "@middlewares/authAdmin.middleware";
import { RequestWithAdmin } from "@interfaces/auth.interface";
import validationMiddleware from "@middlewares/validation.middleware";

@Controller("/admin")
export default class AdminController {
  public adminService = new AdminService();

  @Post('/register')
  @UseBefore(validationMiddleware(CreateAdminDto, 'body'))
  async createAdmin(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const [result, message] = await this.adminService.createAdmin(data);
      return res.status(200).json({ status: result, message });
    } catch (error: any) {
      throw error;
    }
  }

  @Post('/login')
  @UseBefore(validationMiddleware(LoginAdminDto, 'body'))
  async login(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { success, message, data, token, cookie } = await this.adminService.loginAdmin(email, password);

      if (!success) {
        return res.status(401).json({ success, message });
      }

      res.setHeader("Set-Cookie", cookie);

      return res.status(200).json({ data, message, token });
    } catch (error) {
      throw error;
    }
  }

  @Get('/all')
  @UseBefore(authAdminMiddleware)
  async getAllAdmin(@Res() res: Response, next: NextFunction) {
    try {
      const [status, result] = await this.adminService.getAllAdmins();
      return res.status(200).json({ status: status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get('/detail')
  @UseBefore(authAdminMiddleware)
  async getAdminDetail(@Req() req: RequestWithAdmin, @Res() res: Response, next: NextFunction) {
    try {
      if (!req.admin) {
        return res.status(401).json({ success: false, error: "Unauthorized" });
      }

      const [status, result] = await this.adminService.getAdminDetail(req.admin._id);

      if (!status) {
        return res.status(400).json({ status: false, message: result });
      }

      return res.status(200).json({ status: true, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Delete('/delete/:id')
  @UseBefore(authAdminMiddleware)
  @UseBefore(validationMiddleware(DeleteAdminDto, 'params'))
  async deleteAdmin(@Req() req: Request, @Res() res: Response) {
    try {
      const id: string = req.params.id;
      const [result, message] = await this.adminService.deleteAdmin(id);
      return res.status(200).json({ status: result, message });
    } catch (err: any) {
      throw err;
    }
  }
}