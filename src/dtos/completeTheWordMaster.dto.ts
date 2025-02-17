import { IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class CreateCompleteTheWordMasterDto {
  @IsString()
  @IsNotEmpty()
  public game_id: string;

  @IsString()
  @IsNotEmpty()
  public consonant: string;

  @IsString()
  @IsNotEmpty()
  public vowel: string;

  @IsString()
  @IsNotEmpty()
  public image_url: string;
}

export class UpdateCompleteTheWordMasterDto {
  @IsString()
  public consonant?: string;

  @IsString()
  public vowel?: string;

  @IsString()
  public image_url?: string;

  @IsBoolean()
  public is_active?: boolean;
}
