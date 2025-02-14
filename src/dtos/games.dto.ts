import {
  IsString,
  IsNotEmpty,
} from "class-validator";
import { CustomIsNull, CustomIsDefined } from '@utils/validator';
import { CustomIsNullForParam, CustomIsDefinedParam } from '@utils/validator';
import { message } from '@dtos/main.dto';

export class CreateGamesAdminDto {
  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public name_th: string;

  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public name_en: string;

  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public description: string;
}

export class ParamUpdateGamesAdminDto {
  @IsString()
  @CustomIsNullForParam({ message: message.notNull })
  @CustomIsDefinedParam({ message: message.require })
  public id: string
}

export class ParamDetailGamesAdminDto {
  @IsString()
  @CustomIsNullForParam({ message: message.notNull })
  @CustomIsDefinedParam({ message: message.require })
  public id: string
}

export class ParamDeleteGamesAdminDto {
  @IsString()
  @CustomIsNullForParam({ message: message.notNull })
  @CustomIsDefinedParam({ message: message.require })
  public id: string
}