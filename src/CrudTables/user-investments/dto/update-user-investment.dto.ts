import { IsNumber } from 'class-validator';

export class UpdateUserInvestmentDto {
  @IsNumber()
  amount: number;
}
