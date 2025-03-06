import {
  Controller,
  UseBefore,
  Post,
  Req,
  Res,
} from "routing-controllers";
import { Response } from "express";
import { PaginationV1WithApiKeyDto } from './../dtos/utilities.dto';
import learnToWriteService from "./../services/learnToWrite.service";
import validationMiddleware from "./../middlewares/validation.middleware";
import decryptMiddleware from './../middlewares/decrypt.middleware';

@Controller("/learn-to-write")
export default class LearnToWriteController {
  public learnToWriteService = new learnToWriteService();

  @Post('/list')
  @UseBefore(validationMiddleware(PaginationV1WithApiKeyDto, 'body'))
  @UseBefore(decryptMiddleware)
  async listLearnToWrite(@Req() req: any, @Res() res: Response) {
    try {
      const pagination: PaginationV1WithApiKeyDto = req.body;
      const results: Array<any> = await this.learnToWriteService.listLearnToWrite(pagination);
      return res.status(200).json(results);
    } catch (error) {
      throw error;
    }
  }
}
