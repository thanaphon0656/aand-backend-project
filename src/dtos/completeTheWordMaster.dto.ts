import { IsString, IsNotEmpty, IsBoolean, IsArray } from "class-validator";

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
  @IsString()
  public consonant?: string;

  @IsArray()
  @IsNotEmpty()
  public vowel?: string;

  @IsArray()
  @IsNotEmpty()
  public vowel_trap: [];

  @IsString()
  public image_url?: string;

  @IsString()
  public sound: string;

  @IsBoolean()
  public is_active?: boolean;
}
