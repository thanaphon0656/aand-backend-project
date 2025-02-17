import { IsString, IsNumber, IsNotEmpty, IsBoolean, IsIn } from "class-validator";

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

  @IsString()
  @IsIn(["easy", "medium", "hard"])
  public difficulty: "easy" | "medium" | "hard";

  @IsNumber()
  public time_limit: number;
}

export class UpdateLetterMatchWordsLevelDto {
  @IsString()
  public level_id?: string;

  @IsString()
  public title?: string;

  @IsString()
  public description?: string;

  @IsString()
  @IsIn(["easy", "medium", "hard"])
  public difficulty?: "easy" | "medium" | "hard";

  @IsNumber()
  public time_limit?: number;

  @IsBoolean()
  public is_active?: boolean;
}
