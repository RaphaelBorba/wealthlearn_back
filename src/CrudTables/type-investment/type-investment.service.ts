import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypeInvestmentDto } from './dto/create-type-investment.dto';
import { TypeInvestmentRepository } from './type-investment.repository';

@Injectable()
export class TypeInvestmentService {
  constructor(
    private readonly typeInvestmentRepository: TypeInvestmentRepository,
  ) {}

  async create(createTypeInvestmentDto: CreateTypeInvestmentDto) {
    const existType = await this.typeInvestmentRepository.findByName(
      createTypeInvestmentDto.name,
    );
    if (existType) {
      throw new NotFoundException('Tipo de investimento já existe!');
    }
    return this.typeInvestmentRepository.create(createTypeInvestmentDto);
  }

  async findAll() {
    return await this.typeInvestmentRepository.findAll();
  }

  async findOne(id: number) {
    const type = await this.typeInvestmentRepository.findOne(id);

    if (!type)
      throw new NotFoundException('Tipo de investimento não encontrado!');

    return type;
  }

  async remove(id: number) {
    const existType = await this.typeInvestmentRepository.findById(id);
    if (!existType) {
      throw new NotFoundException('Tipo de investimento não encontrado');
    }
    return this.typeInvestmentRepository.remove(id);
  }
}
