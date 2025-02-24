import { Controller, UseBefore, Get, Post, Delete, Req, Res, Patch } from "routing-controllers";
import { Request, Response } from "express";
import { CreateCharacterPuzzleLevelDto, UpdateCharacterPuzzleLevelDto } from "./../../dtos/characterPuzzleLevel.dto";
import CharacterPuzzleLevelService from "./../../services/characterPuzzleLevel.service";
import validationMiddleware from "./../../middlewares/validation.middleware";

@Controller("/admin/character-puzzle-level")
export default class CharacterPuzzleLevelController {
  public characterPuzzleLevelService = new CharacterPuzzleLevelService();

  @Post("/create")
  @UseBefore(validationMiddleware(CreateCharacterPuzzleLevelDto, "body"))
  async create(@Req() req: Request, @Res() res: Response) {
    try {
      const [status, result] = await this.characterPuzzleLevelService.createCharacterPuzzleLevel(req.body);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Patch("/update/:id")
  @UseBefore(validationMiddleware(UpdateCharacterPuzzleLevelDto, "params"))
  async update(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, result] = await this.characterPuzzleLevelService.updateCharacterPuzzleLevel(id, req.body);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/all")
  async getAll(@Res() res: Response) {
    try {
      const [status, result] = await this.characterPuzzleLevelService.getAllCharacterPuzzleLevels();
      return res.status(200).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("/detail/:id")
  async getById(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, result] = await this.characterPuzzleLevelService.getCharacterPuzzleLevelById(id);
      return res.status(status ? 200 : 400).json({ status, data: result });
    } catch (error) {
      throw error;
    }
  }

  @Delete("/delete/:id")
  async delete(@Req() req: Request, @Res() res: Response) {
    try {
      const id = req.params.id;
      const [status, message] = await this.characterPuzzleLevelService.deleteCharacterPuzzleLevel(id);
      return res.status(status ? 200 : 400).json({ status, message });
    } catch (error) {
      throw error;
    }
  }
}
