import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user_tb.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        user_access_id: createUserDto.user_access_id,
      },
    });
  }

  findAll() {
    return this.prismaService.user_tb.findMany();
  }

  findOne(id: number) {
    return this.prismaService.user_tb.findFirst({
      where: {
        id,
      },
    });
  }

  findEmail(email: string) {
    return this.prismaService.user_tb.findFirst({
      where: {
        email,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.user_tb.update({
      where: {
        id,
      },
      data: {
        name: updateUserDto.name,
        updated_at: new Date(),
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
