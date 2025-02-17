import { IsString, IsArray, IsNotEmpty, IsNumber, IsBoolean, IsIn } from "class-validator";

export class CreateSpellingQuestLevelDto {
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
  public spelling_quest_master_id: string[];

  @IsString()
  @IsIn(["easy", "medium", "hard"])
  public difficulty: "easy" | "medium" | "hard";

  @IsNumber()
  public time_limit: number;
}

export class UpdateSpellingQuestLevelDto {
  @IsString()
  public level_id?: string;

  @IsString()
  public title?: string;

  @IsString()
  public description?: string;

  @IsArray()
  public spelling_quest_master_id?: string[];

  @IsString()
  @IsIn(["easy", "medium", "hard"])
  public difficulty?: "easy" | "medium" | "hard";

  @IsNumber()
  public time_limit?: number;

  @IsBoolean()
  public is_active?: boolean;
}
