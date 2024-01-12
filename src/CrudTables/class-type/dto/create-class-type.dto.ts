import { IsNumber, IsString } from 'class-validator';

export class CreateClassTypeDto {
  @IsString()
  name: string;

  @IsNumber()
  type_investment_id: number;
}
