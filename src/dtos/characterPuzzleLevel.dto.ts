import { IsString, IsNotEmpty, IsBoolean, IsArray, IsNumber, IsIn, IsOptional } from "class-validator";

export class CreateCharacterPuzzleLevelDto {
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

export class UpdateCharacterPuzzleLevelDto {
  @IsOptional()
  @IsString()
  public level_id?: string;

  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  @IsString()
  public description?: string;

  @IsOptional()
  @IsArray()
  public character_puzzle_master_id?: string[];

  @IsOptional()
  @IsString()
  @IsIn(["easy", "medium", "hard"])
  public difficulty?: "easy" | "medium" | "hard";

  @IsOptional()
  @IsNumber()
  public time_limit?: number;

  @IsOptional()
  @IsBoolean()
  public is_active?: boolean;
}
