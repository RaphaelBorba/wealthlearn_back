import { IsString } from 'class-validator';

export class CreateAccessUserDto {
  @IsString()
  access: string;
}
