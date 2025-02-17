import { Controller, UseBefore, Get, Post, Delete, Req, Res, Patch } from "routing-controllers";
import { Request, Response } from "express";
import { CreateCharacterPuzzleMasterDto, UpdateCharacterPuzzleMasterDto } from "./../../dtos/characterPuzzleMaster.dto";
import CharacterPuzzleMasterService from "./../../services/characterPuzzleMaster.service";
import validationMiddleware from "./../../middlewares/validation.middleware";

@Controller("/admin/character-puzzle-master")
export default class CharacterPuzzleMasterController {
  public characterPuzzleMasterService = new CharacterPuzzleMasterService();

  @Post("/create")
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
  async getAll(@Res() res: Response) {
    try {
      const [status, result] = await this.characterPuzzleMasterService.getAllCharacterPuzzleMasters();
      return res.status(200).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/detail/:id")
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
  async delete(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, message] = await this.characterPuzzleMasterService.deleteCharacterPuzzleMaster(id);
      return res.status(status ? 200 : 400).json({ status, message });
    } catch (error) {
      throw error;
    }
  }
}
