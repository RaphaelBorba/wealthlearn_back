import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClassTypeDto } from './dto/create-class-type.dto';
import { UpdateClassTypeDto } from './dto/update-class-type.dto';
import { ClassTypeRepository } from './class-type.repository';
import { TypeInvestmentService } from '../type-investment/type-investment.service';

@Injectable()
export class ClassTypeService {
  constructor(
    private readonly classTypeRepository: ClassTypeRepository,
    private readonly typeInvestmentService: TypeInvestmentService,
  ) {}

  async create(createClassTypeDto: CreateClassTypeDto) {
    const existClassName = await this.classTypeRepository.findByName(
      createClassTypeDto.name,
    );

    if (existClassName) {
      throw new ConflictException('Este nome já está cadastrado');
    }
    // Verify if type investment id exist
    await this.typeInvestmentService.findOne(
      createClassTypeDto.type_investment_id,
    );

    try {
      const newClassType =
        await this.classTypeRepository.create(createClassTypeDto);

      return newClassType;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Error no servidor');
    }
  }

  async findAll() {
    const existClassesTypes = await this.classTypeRepository.findAll();

    if (!existClassesTypes) {
      throw new NotFoundException('Nenhum Tipo de Classe encontrado!');
    }

    return existClassesTypes;
  }

  async findOne(id: number) {
    const existClassType = await this.classTypeRepository.findOne(id);

    if (!existClassType) {
      throw new NotFoundException('Tipo de Classe não encontrado!');
    }

    return existClassType;
  }

  async update(id: number, updateClassTypeDto: UpdateClassTypeDto) {
    await this.findOne(id);

    try {
      const updatedClassType = await this.classTypeRepository.update(
        id,
        updateClassTypeDto,
      );

      return updatedClassType;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro no Servidor');
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      return this.classTypeRepository.remove(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro no Servidor!');
    }
  }
}
