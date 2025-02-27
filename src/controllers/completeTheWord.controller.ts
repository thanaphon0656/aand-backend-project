import {
  Controller,
  UseBefore,
  Post,
  Req,
  Res,
} from "routing-controllers";
import { Response } from "express";
import { PaginationV1WithApiKeyDto } from './../dtos/utilities.dto';
import completeTheWordService from "./../services/completeTheWord.service";
import validationMiddleware from "./../middlewares/validation.middleware";
import decryptMiddleware from './../middlewares/decrypt.middleware';

@Controller("/complete-the-word")
export default class CompleteTheWordController {
  public completeTheWordService = new completeTheWordService();

  @Post('/list')
  @UseBefore(validationMiddleware(PaginationV1WithApiKeyDto, 'body'))
  @UseBefore(decryptMiddleware)
  async listItemMaster(@Req() req: any, @Res() res: Response) {
    try {
      const pagination: PaginationV1WithApiKeyDto = req.body;
      const results: Array<any> = await this.completeTheWordService.listCompleteTheWord(pagination);
      return res.status(200).json(results);
    } catch (error) {
      throw error;
    }
  }
}
