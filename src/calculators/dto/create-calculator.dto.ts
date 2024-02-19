import { IsIn, IsNumber } from 'class-validator';

export class SimpleTaxCalculatorDto {
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

export class CompostTaxCalcuatorDto extends SimpleTaxCalculatorDto {
  @IsNumber()
  monthValue: number;
}
