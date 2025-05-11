import { IsString, IsArray, IsNotEmpty, IsBoolean } from "class-validator";

export class CreateLetterMatchWordsMasterDto {
  @IsString()
  @IsNotEmpty()
  public game_id: string;

  @IsString()
  @IsNotEmpty()
  public word: string;

  @IsArray()
  @IsNotEmpty()
  public phonetics: string[];

  @IsString()
  @IsNotEmpty()
  public color: string;

  @IsString()
  @IsNotEmpty()
  public image_url: string;

  @IsString()
  public sound: string;

  @IsString()
  @IsNotEmpty()
  public category: string;
}

export class UpdateLetterMatchWordsMasterDto {
  @IsString()
  public word?: string;

  @IsArray()
  public phonetics?: string[];

  @IsString()
  public color?: string;

  @IsString()
  public image_url?: string;

  @IsString()
  public sound: string;

  @IsString()
  public category?: string;

  @IsBoolean()
  public is_active?: boolean;
}
