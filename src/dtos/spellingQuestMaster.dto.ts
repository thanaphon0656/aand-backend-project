import {
  IsString,
  IsNotEmpty,
  IsArray,
} from "class-validator";
import { CustomIsNull, CustomIsDefined } from "./../utils/validator";
import { CustomIsNullForParam, CustomIsDefinedParam } from "./../utils/validator";
import { message } from "./../dtos/main.dto";

export class CreateSpellingQuestMasterDto {
  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public game_id: string;

  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public word: string;

  @IsArray()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public phonetics: string[];

  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public image_url: string;

  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public category: string;
}

export class ParamUpdateSpellingQuestMasterDto {
  @IsString()
  @CustomIsNullForParam({ message: message.notNull })
  @CustomIsDefinedParam({ message: message.require })
  public id: string;
}

export class ParamDetailSpellingQuestMasterDto {
  @IsString()
  @CustomIsNullForParam({ message: message.notNull })
  @CustomIsDefinedParam({ message: message.require })
  public id: string;
}

export class ParamDeleteSpellingQuestMasterDto {
  @IsString()
  @CustomIsNullForParam({ message: message.notNull })
  @CustomIsDefinedParam({ message: message.require })
  public id: string;
}