import {
  Controller,
  UseBefore,
  Post,
  Req,
  Res,
} from "routing-controllers";
import { Response } from "express";
import { PaginationV1WithApiKeyDto } from './../dtos/utilities.dto';
import wordChoiceService from "./../services/wordChoice.service";
import validationMiddleware from "./../middlewares/validation.middleware";
import decryptMiddleware from './../middlewares/decrypt.middleware';

@Controller("/word-choice")
export default class WordChoiceController {
  public wordChoiceService = new wordChoiceService();

  @Post('/list')
  @UseBefore(validationMiddleware(PaginationV1WithApiKeyDto, 'body'))
  @UseBefore(decryptMiddleware)
  async listWordChoice(@Req() req: any, @Res() res: Response) {
    try {
      const pagination: PaginationV1WithApiKeyDto = req.body;
      const results: Array<any> = await this.wordChoiceService.listWordChoice(pagination);
      return res.status(200).json(results);
    } catch (error) {
      throw error;
    }
  }
}
