import { IsString, IsNumber, IsNotEmpty, IsIn, IsArray } from "class-validator";
import { CustomIsNullForParam, CustomIsDefinedParam } from "./../utils/validator";
import { message } from "./../dtos/main.dto";

export class CreateLetterMatchWordsLevelDto {
  @IsString()
  @IsNotEmpty()
  public game_id: string;

  @IsString()
  @IsNotEmpty()
  public level_id: string;

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsArray()
  @IsNotEmpty()
  public character_puzzle_master_id: string[];

  @IsString()
  @IsIn(["easy", "medium", "hard"])
  public difficulty: "easy" | "medium" | "hard";

  @IsNumber()
  public time_limit: number;
}

export class UpdateLetterMatchWordsLevelDto {
  @IsString()
  @CustomIsNullForParam({ message: message.notNull })
  @CustomIsDefinedParam({ message: message.require })
  public id: string;
}
