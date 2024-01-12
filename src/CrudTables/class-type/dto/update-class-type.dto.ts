import { IsString } from 'class-validator';

export class UpdateClassTypeDto {
  @IsString()
  name: string;
}
