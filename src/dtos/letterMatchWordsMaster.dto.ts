import { IsString, IsArray, IsNotEmpty, IsBoolean, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class PhoneticsItem {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsOptional()
  sound_sub?: string = ""; 
}

export class CreateLetterMatchWordsMasterDto {
  @IsString()
  @IsNotEmpty()
  public game_id: string;

  @IsString()
  @IsNotEmpty()
  public word: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PhoneticsItem)
  phonetics: PhoneticsItem[];

  @IsString()
  @IsNotEmpty()
  public image_url: string;

  @IsString()
  public sound: string;
}

export class UpdateLetterMatchWordsMasterDto {
  @IsOptional()
  @IsString()
  public word?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PhoneticsItem)
  public phonetics?: PhoneticsItem[];

  @IsOptional()
  @IsString()
  public image_url?: string;

  @IsOptional()
  @IsString()
  public sound?: string;

  @IsOptional()
  @IsBoolean()
  public is_active?: boolean;
}
