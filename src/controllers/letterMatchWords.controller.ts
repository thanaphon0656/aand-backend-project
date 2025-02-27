import {
  Controller,
  UseBefore,
  Post,
  Req,
  Res,
} from "routing-controllers";
import { Response } from "express";
import { PaginationV1WithApiKeyDto } from './../dtos/utilities.dto';
import letterMatchWordsService from "./../services/letterMatchWords.service";
import validationMiddleware from "./../middlewares/validation.middleware";
import decryptMiddleware from './../middlewares/decrypt.middleware';

@Controller("/letter-match-words")
export default class LetterMatchWordsController {
  public letterMatchWordsService = new letterMatchWordsService();

  @Post('/list')
  @UseBefore(validationMiddleware(PaginationV1WithApiKeyDto, 'body'))
  @UseBefore(decryptMiddleware)
  async listItemMaster(@Req() req: any, @Res() res: Response) {
    try {
      const pagination: PaginationV1WithApiKeyDto = req.body;
      const results: Array<any> = await this.letterMatchWordsService.listLetterMatchWords(pagination);
      return res.status(200).json(results);
    } catch (error) {
      throw error;
    }
  }
}
