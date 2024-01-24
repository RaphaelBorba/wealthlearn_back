import { IsDateString, IsNumber } from 'class-validator';

export class CreateUserInvestmentDto {
  @IsNumber()
  user_id: number;

  @IsNumber()
  investment_id: number;

  @IsNumber()
  amount: number;

  @IsDateString()
  bought_at: Date;
}
