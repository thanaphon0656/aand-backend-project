import { Controller, UseBefore, Get, Post, Delete, Req, Res, Patch } from "routing-controllers";
import { Request, Response } from "express";
import { CreateCharacterPuzzleMasterDto, UpdateCharacterPuzzleMasterDto } from "./../../dtos/characterPuzzleMaster.dto";
import CharacterPuzzleMasterService from "./../../services/characterPuzzleMaster.service";
import validationMiddleware from "./../../middlewares/validation.middleware";
import authAdminMiddleware from "./../../middlewares/authAdmin.middleware";
import { PaginationV1WithSortSearchDto } from './../../dtos/utilities.dto';

@Controller("/admin/character-puzzle-master")
export default class CharacterPuzzleMasterController {
  public characterPuzzleMasterService = new CharacterPuzzleMasterService();

  @Post("/create")
  @UseBefore(authAdminMiddleware)
  @UseBefore(validationMiddleware(CreateCharacterPuzzleMasterDto, "body"))
  async create(@Req() req: Request, @Res() res: Response) {
    try {
      const [status, result] = await this.characterPuzzleMasterService.createCharacterPuzzleMaster(req.body);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Patch("/update/:id")
  @UseBefore(authAdminMiddleware)
  @UseBefore(validationMiddleware(UpdateCharacterPuzzleMasterDto, "body"))
  async update(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, result] = await this.characterPuzzleMasterService.updateCharacterPuzzleMaster(id, req.body);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/all")
  @UseBefore(authAdminMiddleware)
  async getAll(@Res() res: Response) {
    try {
      const [status, result] = await this.characterPuzzleMasterService.getAllCharacterPuzzleMasters();
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
      const [status, result] = await this.characterPuzzleMasterService.getCharacterPuzzleMasterById(id);
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
      const [status, message] = await this.characterPuzzleMasterService.deleteCharacterPuzzleMaster(id);
      return res.status(status ? 200 : 400).json({ status, message });
    } catch (error) {
      throw error;
    }
  }

  @Post("/list")
  @UseBefore(authAdminMiddleware)
  @UseBefore(validationMiddleware(PaginationV1WithSortSearchDto, 'body'))
  async listCharacterPuzzleMaster(@Req() req: any, @Res() res: Response) {
    try {
      const pagination: PaginationV1WithSortSearchDto = req.body;
      const results: Array<any> = await this.characterPuzzleMasterService.listCharacterPuzzleMaster(pagination);
      return res.status(200).json(results);
    } catch (error) {
      throw error;
    }
  }
}
