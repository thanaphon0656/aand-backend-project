import { IsString, IsNotEmpty, IsBoolean, IsArray, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class ChoiceItem {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsOptional()
  sound_sub?: string = ""; 
}

export class CreateWordChoiceMasterDto {
  @IsString()
  @IsNotEmpty()
  public game_id: string;

  @IsString()
  @IsNotEmpty()
  public word: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChoiceItem)
  choice: ChoiceItem[];

  @IsString()
  public image_url: string;

}

export class UpdateWordChoiceMasterDto {
  @IsOptional()
  @IsString()
  public word?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChoiceItem)
  public choice: ChoiceItem[];

  @IsOptional()
  @IsString()
  public image_url?: string;

  @IsOptional()
  @IsBoolean()
  public is_active?: boolean;
}
