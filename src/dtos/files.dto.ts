import {
  IsString
} from "class-validator";

import { CustomIsNullForParam, CustomIsDefinedParam } from '@utils/validator';
import { message } from '@dtos/main.dto';

export class DeleteFilePramDTO {
  @IsString()
  @CustomIsNullForParam({ message: message.notNull })
  @CustomIsDefinedParam({ message: message.require })
  public file_id: string
}