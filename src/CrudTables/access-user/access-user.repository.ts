import { Injectable } from '@nestjs/common';
import { CreateAccessUserDto } from './dto/create-access-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccessUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAccessUserDto: CreateAccessUserDto) {
    return await this.prismaService.user_access_tb.create({
      data: {
        access: createAccessUserDto.access,
      },
    });
  }

  async findAll() {
    return await this.prismaService.user_access_tb.findMany({});
  }

  async findById(id: number) {
    return await this.prismaService.user_access_tb.findFirst({
      where: {
        id,
      },
    });
  }

  findByAccess(access: string) {
    return this.prismaService.user_access_tb.findFirst({
      where: {
        access,
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.user_access_tb.delete({
      where: {
        id,
      },
    });
  }
}
