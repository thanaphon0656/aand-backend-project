import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from "class-validator";
import { CustomIsNull, CustomIsDefined } from "./../utils/validator";
import { message } from "./../dtos/main.dto";

export class AddLeaderboardHistoryDto {
  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public player_id: string;

  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public game_id: string;

  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public level_id: string;

  @IsNumber()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public score: number;

  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public api_key: string;
}

export class ListLeaderboardHistoryDto {
  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public player_id: string;

  @IsString()
  @IsOptional()
  public game_id: string;

  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public api_key: string;
}

export class ScoreLeaderboardHistoryDto {
  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public player_id: string;

  @IsString()
  @IsOptional()
  public game_id: string;

  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public api_key: string;
}