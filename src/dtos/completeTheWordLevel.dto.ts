import { IsString, IsNotEmpty, IsBoolean, IsIn, IsNumber } from "class-validator";
import { CustomIsNullForParam, CustomIsDefinedParam } from "./../utils/validator";
import { message } from "./../dtos/main.dto";

export class CreateCompleteTheWordLevelDto {
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

  @IsString()
  @IsNotEmpty()
  public complete_the_word_master_id: string;

  @IsString()
  @IsIn(["easy", "medium", "hard"])
  public difficulty: "easy" | "medium" | "hard";

  @IsNumber()
  public time_limit: number;
}

export class UpdateCompleteTheWordLevelDto {
  @IsString()
  @CustomIsNullForParam({ message: message.notNull })
  @CustomIsDefinedParam({ message: message.require })
  public id: string;
}
