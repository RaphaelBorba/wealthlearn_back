import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { InvestmentsRepository } from './investments.repository';
import { ClassTypeService } from '../class-type/class-type.service';

@Injectable()
export class InvestmentsService {
  constructor(
    private readonly investmentsRepository: InvestmentsRepository,
    private readonly classTypeService: ClassTypeService,
  ) {}

  private internalServerError = new InternalServerErrorException(
    'Erro no Servidor!',
  );

  private dateCheck = (date: Date) => new Date(date) > new Date();

  async create(createInvestmentDto: CreateInvestmentDto) {
    if (!this.dateCheck(createInvestmentDto.expires_in)) {
      throw new BadRequestException(
        'A data de validade tem que ser maior que a data atual!',
      );
    }

    await this.classTypeService.findOne(createInvestmentDto.class_type_id);

    try {
      const newInvestment =
        await this.investmentsRepository.create(createInvestmentDto);

      return newInvestment;
    } catch (error) {
      console.log(error);

      throw this.internalServerError;
    }
  }

  async findAll() {
    try {
      const investments = await this.investmentsRepository.findAll();

      return investments;
    } catch (error) {
      console.log(error);

      throw this.internalServerError;
    }
  }

  async findOne(id: number) {
    const existInvestment = await this.investmentsRepository.findOne(id);

    if (!existInvestment) {
      throw new NotFoundException('Investimento não encontrado!');
    }

    return existInvestment;
  }

  async update(id: number, updateInvestmentDto: UpdateInvestmentDto) {
    if (!this.dateCheck(updateInvestmentDto.expires_in)) {
      throw new BadRequestException(
        'A data de validade tem que ser maior que a data atual!',
      );
    }

    await this.findOne(id);
    await this.classTypeService.findOne(updateInvestmentDto.class_type_id);

    try {
      const updatedInvestment = await this.investmentsRepository.update(
        id,
        updateInvestmentDto,
      );

      return updatedInvestment;
    } catch (error) {
      console.log(error);

      throw this.internalServerError;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    try {
      return this.investmentsRepository.remove(id);
    } catch (error) {
      console.log(error);

      throw this.internalServerError;
    }
  }
}
