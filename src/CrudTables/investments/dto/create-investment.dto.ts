import {
  IsDateString,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateInvestmentDto {
  @IsString()
  @MinLength(3)
  @MaxLength(70)
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  performance_annual: number;

  @IsDateString()
  expires_in: Date;

  @IsNumber()
  class_type_id: number;
}
