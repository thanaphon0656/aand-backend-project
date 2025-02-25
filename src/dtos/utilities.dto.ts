import { IsString, IsNotEmpty, IsNumber, IsOptional, IsIn } from 'class-validator';
import { CustomIsNull, CustomIsDefined } from '@utils/validator';
import { message } from '@dtos/main.dto';

export class PaginationV1Dto {
  @IsNumber()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public page: number;

  @IsNumber()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public limit: number;
}

export class PaginationV1WithSortDto extends PaginationV1Dto {
  @IsIn([-1, 1], { message: `Validation error: \"sort\" must be a -1 or 1` })
  @IsOptional()
  @IsNumber()
  public sort: number;

  @IsOptional()
  @IsString()
  public sort_option: string;
}

export class PaginationV1WithSortSearchDto extends PaginationV1WithSortDto {
  @IsOptional()
  @IsString()
  public search: string;
}

export class PaginationV1WithApiKeyDto extends PaginationV1WithSortSearchDto {
  @IsString()
  @IsNotEmpty({ message: message.notEmpty })
  @CustomIsDefined({ message: message.require })
  @CustomIsNull({ message: message.notNull })
  public api_key: string;
}
