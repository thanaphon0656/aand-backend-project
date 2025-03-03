import { Request, Response } from "express";
import filesService from "./../../services/files.service";
import {
  Controller,
  UseBefore,
  Post,
  Req,
  Res,
  UploadedFile,
  Delete
} from "routing-controllers";
import authAdminMiddleware from "./../../middlewares/authAdmin.middleware";
import { uploadMiddleware } from "./../../middlewares/upload.midlleware";
import { PaginationV1WithSortSearchDto } from './../../dtos/utilities.dto';
import { DeleteFilePramDTO } from './../../dtos/files.dto';
import validationMiddleware from "./../../middlewares/validation.middleware";

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
      return res.status(200).json({ status: true, url: result });

    } catch (err: any) {
      return res.status(400).json({ status: false, message: err.message });
    }
  }

  @Post("/list")
  @UseBefore(authAdminMiddleware)
  @UseBefore(validationMiddleware(PaginationV1WithSortSearchDto, "body"))
  async listSkillMaster(@Req() req: Request, @Res() res: Response) {
    try {
      const pagination: PaginationV1WithSortSearchDto = req.body;
      const results = await this.filesService.listFile(pagination);
      return res.status(200).json(results);
    } catch (error) {
      throw error;
    }
  }


  @Delete('/delete/:file_id')
  @UseBefore(authAdminMiddleware)
  @UseBefore(validationMiddleware(DeleteFilePramDTO, 'params'))
  async updateInventoryItem(@Req() req: Request, @Res() res: Response) {
    try {
      const file_id: string = req.params.file_id;
      const result = await this.filesService.deleteFile(file_id);
      return res.status(200).json(result);
    } catch (err: any) {
      throw err;
    }
  }
}
