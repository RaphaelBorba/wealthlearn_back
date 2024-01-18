import { Injectable } from '@nestjs/common';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InvestmentsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private investmentQuery = this.prismaService.investment_tb;

  async create(createInvestmentDto: CreateInvestmentDto) {
    return await this.investmentQuery.create({
      data: {
        name: createInvestmentDto.name,
        price: createInvestmentDto.price,
        performance_annual: createInvestmentDto.performance_annual,
        expires_in: createInvestmentDto.expires_in,
        class_type_id: createInvestmentDto.class_type_id,
      },
    });
  }

  async findAll() {
    return await this.investmentQuery.findMany();
  }

  async findOne(id: number) {
    return await this.investmentQuery.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateInvestmentDto: UpdateInvestmentDto) {
    return await this.investmentQuery.update({
      where: {
        id,
      },
      data: {
        name: updateInvestmentDto.name,
        price: updateInvestmentDto.price,
        performance_annual: updateInvestmentDto.performance_annual,
        expires_in: updateInvestmentDto.expires_in,
        class_type_id: updateInvestmentDto.class_type_id,
        updated_at: new Date(),
      },
    });
  }

  async remove(id: number) {
    return await this.investmentQuery.delete({
      where: {
        id,
      },
    });
  }
}
