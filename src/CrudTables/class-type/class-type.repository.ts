import { Injectable } from '@nestjs/common';
import { CreateClassTypeDto } from './dto/create-class-type.dto';
import { UpdateClassTypeDto } from './dto/update-class-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClassTypeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private queryClassType = this.prismaService.class_type_tb;

  create(createClassTypeDto: CreateClassTypeDto) {
    return this.queryClassType.create({
      data: {
        name: createClassTypeDto.name,
        type_investment_id: createClassTypeDto.type_investment_id,
      },
    });
  }

  async findAll() {
    return this.queryClassType.findMany();
  }

  async findOne(id: number) {
    return await this.queryClassType.findFirst({
      where: {
        id,
      },
    });
  }

  async findByName(name: string) {
    return await this.queryClassType.findFirst({
      where: {
        name,
      },
    });
  }

  async update(id: number, updateClassTypeDto: UpdateClassTypeDto) {
    return await this.queryClassType.update({
      where: {
        id,
      },
      data: {
        name: updateClassTypeDto.name,
      },
    });
  }

  async remove(id: number) {
    return await this.queryClassType.delete({
      where: {
        id,
      },
    });
  }
}
