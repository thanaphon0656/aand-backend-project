import { IsString, IsNotEmpty, IsBoolean, IsArray, IsOptional } from "class-validator";

export class CreateCompleteTheWordMasterDto {
  @IsString()
  @IsNotEmpty()
  public game_id: string;

  @IsString()
  @IsNotEmpty()
  public consonant: string;

  @IsArray()
  @IsNotEmpty()
  public vowel: [];

  @IsArray()
  @IsNotEmpty()
  public vowel_trap: [];

  @IsString()
  public image_url: string;

  @IsString()
  public sound: string;
}

export class UpdateCompleteTheWordMasterDto {
  @IsOptional()
  @IsString()
  public consonant?: string;

  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  public vowel?: string;

  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  public vowel_trap: [];

  @IsOptional()
  @IsString()
  public image_url?: string;

  @IsOptional()
  @IsString()
  public sound: string;

  @IsOptional()
  @IsBoolean()
  public is_active?: boolean;
}
