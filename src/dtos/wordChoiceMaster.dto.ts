import { IsString, IsNotEmpty, IsBoolean, IsArray } from "class-validator";

export class CreateWordChoiceMasterDto {
  @IsString()
  @IsNotEmpty()
  public game_id: string;

  @IsString()
  @IsNotEmpty()
  public word: string;

  @IsArray()
  @IsNotEmpty()
  public choice: Array<string>;

  @IsString()
  public image_url: string;

  @IsString()
  public sound: string;
}

export class UpdateWordChoiceMasterDto {
  @IsString()
  public word?: string;

  @IsArray()
  @IsNotEmpty()
  public choice: Array<string>;

  @IsString()
  public image_url?: string;

  @IsString()
  public sound: string;

  @IsBoolean()
  public is_active?: boolean;
}
