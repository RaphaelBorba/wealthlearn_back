import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInvestmentDto } from './dto/create-user-investment.dto';
import { UpdateUserInvestmentDto } from './dto/update-user-investment.dto';
import { UserInvestmentsRepository } from './user-investments.repository';
import { UserService } from '../user/user.service';
import { InvestmentsService } from '../investments/investments.service';

@Injectable()
export class UserInvestmentsService {
  constructor(
    private readonly userInvestmentsRepository: UserInvestmentsRepository,
    private readonly userService: UserService,
    private readonly investmentService: InvestmentsService,
  ) {}

  async create(createUserInvestmentDto: CreateUserInvestmentDto) {
    await this.userService.findOne(createUserInvestmentDto.user_id);
    await this.investmentService.findOne(createUserInvestmentDto.investment_id);

    const existUserWithInvestment =
      await this.userInvestmentsRepository.findOneByIdUserAndIdInvestment(
        createUserInvestmentDto.user_id,
        createUserInvestmentDto.investment_id,
      );

    if (existUserWithInvestment) {
      throw new BadRequestException(
        'Usuário já tem esse investimento na conta. Caso queira alteração, faça uma atualização no investimento!',
      );
    }

    try {
      const newUserInvestment = await this.userInvestmentsRepository.create(
        createUserInvestmentDto,
      );

      return newUserInvestment;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro no Servidor!');
    }
  }

  async returnInvestmentsWithAmount(userId: number) {
    await this.userService.findOne(userId);

    try {
      const investmentsUser =
        this.userInvestmentsRepository.returnInvestmentsUserWithInvestmentsData(
          userId,
        );

      return investmentsUser;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Erro no Servidor!');
    }

    return;
  }

  async findAll() {
    try {
      return this.userInvestmentsRepository.findAll();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro no Servidor!');
    }
  }

  async findAllByIdUser(user_id: number) {
    await this.userService.findOne(user_id);

    try {
      return this.userInvestmentsRepository.findAllByIdUser(user_id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro no Servidor!');
    }
  }

  async findAllByIdInvestment(investment_id: number) {
    await this.investmentService.findOne(investment_id);

    try {
      return this.userInvestmentsRepository.findAllByIdInvestment(
        investment_id,
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro no Servidor!');
    }
  }

  async findOne(id: number) {
    const exist = await this.userInvestmentsRepository.findOne(id);

    if (!exist) {
      throw new NotFoundException('Investimento do usuário não encontrado!');
    }

    return exist;
  }

  async update(id: number, updateUserInvestmentDto: UpdateUserInvestmentDto) {
    await this.findOne(id);

    try {
      const updated = this.userInvestmentsRepository.update(
        id,
        updateUserInvestmentDto,
      );

      return updated;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Erro no Servidor!');
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      return await this.userInvestmentsRepository.remove(id);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Erro no Servidor!');
    }
  }
}
