import { Injectable } from '@nestjs/common';
import { CreateTypeInvestmentDto } from './dto/create-type-investment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TypeInvestmentRepository {
  constructor(private readonly prismaService: PrismaService) {}
  private query = this.prismaService.type_investment_tb;

  create(createTypeInvestmentDto: CreateTypeInvestmentDto) {
    return this.query.create({
      data: {
        name: createTypeInvestmentDto.name,
      },
    });
  }

  findAll() {
    return this.query.findMany({});
  }

  findOne(id: number) {
    return this.query.findFirst({
      where: {
        id,
      },
    });
  }

  findById(id: number) {
    return this.query.findFirst({
      where: {
        id,
      },
    });
  }

  findByName(name: string) {
    return this.query.findFirst({
      where: {
        name,
      },
    });
  }

  remove(id: number) {
    return this.query.delete({
      where: {
        id,
      },
    });
  }
}
