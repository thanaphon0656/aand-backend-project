import { Request, Response } from "express";
import filesService from "./../../services/files.service";
import {
  Controller,
  UseBefore,
  Post,
  Req,
  Res,
  UploadedFile,
} from "routing-controllers";
import authAdminMiddleware from "./../../middlewares/authAdmin.middleware";
import { uploadMiddleware } from "@middlewares/upload.midlleware";

@Controller("/admin/files")
export default class FilesController {
  private filesService: filesService;

  constructor() {
    this.filesService = new filesService();
  }

  @Post("/upload-file/:id/:folder")
  @UseBefore(authAdminMiddleware, uploadMiddleware.single("file"))
  async uploadFile(
    @Req() req: Request,
    @UploadedFile("file") file: any,
    @Res() res: Response
  ) {
    try {
      const { id, folder } = req.params;

      if (!file) {
        return res
          .status(400)
          .json({ status: false, message: "No file uploaded" });
      }

      const result = await this.filesService.uploadFileToS3(id, folder, file);
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(400).json({ status: false, message: err.message });
    }
  }
}
