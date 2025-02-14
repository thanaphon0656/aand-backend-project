import {
  IsString,
  IsInt,
  IsBoolean,
  IsNumber,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty
} from "class-validator";
import { CustomIsNull, CustomIsDefined } from './../utils/validator';
import { CustomIsNullForParam, CustomIsDefinedParam } from './../utils/validator';
import { message } from './../dtos/main.dto';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public username: string;

  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public email: string;

  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public password: string;

  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public role: string;
}

export class LoginAdminDto {
  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public email: string;

  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public password: string;
}

export class DeleteAdminDto {
  @IsString()
  @CustomIsNullForParam({ message: message.notNull })
  @CustomIsDefinedParam({ message: message.require })
  public id: string
}