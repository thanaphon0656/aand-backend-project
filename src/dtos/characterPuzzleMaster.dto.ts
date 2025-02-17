import { IsString, IsNotEmpty, IsBoolean } from "class-validator";

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
  @IsString()
  public letter?: string;

  @IsString()
  public image_url?: string;

  @IsString()
  public type?: string;

  @IsBoolean()
  public is_active?: boolean;
}
