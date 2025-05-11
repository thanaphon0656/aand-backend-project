import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsIn
} from "class-validator";
import { CustomIsNull, CustomIsDefined } from "./../utils/validator";
import { message } from "./../dtos/main.dto";

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

export class AddLeaderboardScoreDto {
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

  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  @IsIn(['increase', 'decrease'], { message: 'change_type must be increase or decrease' })
  public change_type: string;

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