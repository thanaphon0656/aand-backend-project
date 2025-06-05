import { IsString, IsNotEmpty, IsBoolean, IsOptional } from "class-validator";

export class CreateCharacterPuzzleMasterDto {
  @IsString()
  @IsNotEmpty()
  public game_id: string;

  @IsString()
  @IsNotEmpty()
  public letter: string;

  @IsString()
  @IsNotEmpty()
  public image_url: string;

  @IsString()
  @IsNotEmpty()
  public type: string;
}

export class UpdateCharacterPuzzleMasterDto {
  @IsOptional()
  @IsString()
  public letter?: string;

  @IsOptional()
  @IsString()
  public image_url?: string;

  @IsOptional()
  @IsString()
  public type?: string;
  
  @IsOptional()
  @IsBoolean()
  public is_active?: boolean;
}
