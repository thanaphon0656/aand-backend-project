import { IsString, IsNotEmpty, IsBoolean, IsArray, IsNumber, IsIn } from "class-validator";

export class CreateLearnToWriteLevelDto {
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
  public learn_to_write_master_id: string[];

  @IsString()
  @IsIn(["easy", "medium", "hard"])
  public difficulty: "easy" | "medium" | "hard";

  @IsNumber()
  public time_limit: number;
}

export class UpdateLearnToWriteLevelDto {
  @IsString()
  public level_id?: string;

  @IsString()
  public title?: string;

  @IsString()
  public description?: string;

  @IsArray()
  public learn_to_write_master_id?: string[];

  @IsString()
  @IsIn(["easy", "medium", "hard"])
  public difficulty?: "easy" | "medium" | "hard";

  @IsNumber()
  public time_limit?: number;

  @IsBoolean()
  public is_active?: boolean;
}
