import {
  IsString,
  IsNotEmpty
} from "class-validator";
import { CustomIsNull, CustomIsDefined } from './../utils/validator';
import { message } from './../dtos/main.dto';

export class LoginPlayerWithProviderDto {
  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public email: string;

  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public provider_access_token: string;

  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public provider_name: string;
}