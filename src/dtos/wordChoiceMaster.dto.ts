import { IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class CreateWordChoiceMasterDto {
  @IsString()
  @IsNotEmpty()
  public game_id: string;

  @IsString()
  @IsNotEmpty()
  public word: string;

  @IsString()
  @IsNotEmpty()
  public image_url: string;
}

export class UpdateWordChoiceMasterDto {
  @IsString()
  public word?: string;

  @IsString()
  public image_url?: string;

  @IsBoolean()
  public is_active?: boolean;
}
