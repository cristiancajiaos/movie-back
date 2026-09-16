import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationQueryDto {
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  limit: number;
}