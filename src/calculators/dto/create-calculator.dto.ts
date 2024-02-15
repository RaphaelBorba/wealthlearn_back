import { IsIn, IsNumber } from 'class-validator';

export class CreateCalculatorDto {
  @IsNumber()
  amount: number;

  @IsNumber()
  tax: number;

  @IsNumber()
  time: number;

  @IsIn(['year', 'month'])
  typeTax: 'year' | 'month';

  @IsIn(['year', 'month'])
  typeTime: 'year' | 'month';
}
