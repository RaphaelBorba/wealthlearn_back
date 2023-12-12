import { IsString } from 'class-validator';

export class CreateTypeInvestmentDto {
  @IsString()
  name: string;
}
