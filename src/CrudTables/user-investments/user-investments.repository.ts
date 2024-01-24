import { Injectable } from '@nestjs/common';
import { CreateUserInvestmentDto } from './dto/create-user-investment.dto';
import { UpdateUserInvestmentDto } from './dto/update-user-investment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserInvestmentsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private userInvestmentsQuery = this.prismaService.user_investment_tb;

  async create(createUserInvestmentDto: CreateUserInvestmentDto) {
    return await this.userInvestmentsQuery.create({
      data: {
        user_id: createUserInvestmentDto.user_id,
        investment_id: createUserInvestmentDto.investment_id,
        amount: createUserInvestmentDto.amount,
        bought_at: createUserInvestmentDto.bought_at,
      },
    });
  }

  async findAll() {
    return await this.userInvestmentsQuery.findMany({});
  }

  async findOne(id: number) {
    return await this.userInvestmentsQuery.findFirst({
      where: {
        id,
      },
    });
  }

  async findAllByIdUser(user_id: number) {
    return this.userInvestmentsQuery.findMany({
      where: {
        user_id,
      },
    });
  }

  async findAllByIdInvestment(investment_id: number) {
    return this.userInvestmentsQuery.findMany({
      where: {
        investment_id,
      },
    });
  }

  async findOneByIdUserAndIdInvestment(user_id: number, investment_id: number) {
    return this.userInvestmentsQuery.findFirst({
      where: {
        user_id,
        investment_id,
      },
    });
  }

  async returnInvestmentsUserWithInvestmentsData(userId: number) {
    return await this.userInvestmentsQuery.findMany({
      where: {
        user_id: userId,
      },
      include: {
        investment_tb: true,
      },
    });
  }

  async update(id: number, updateUserInvestmentDto: UpdateUserInvestmentDto) {
    return await this.userInvestmentsQuery.update({
      where: {
        id,
      },
      data: {
        amount: updateUserInvestmentDto.amount,
        updated_at: new Date(),
      },
    });
  }

  async remove(id: number) {
    return await this.userInvestmentsQuery.delete({
      where: {
        id,
      },
    });
  }
}
