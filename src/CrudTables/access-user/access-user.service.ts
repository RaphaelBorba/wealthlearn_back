import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAccessUserDto } from './dto/create-access-user.dto';
import { AccessUserRepository } from './access-user.repository';

@Injectable()
export class AccessUserService {
  constructor(private readonly accessUserRepository: AccessUserRepository) {}

  async create(createAccessUserDto: CreateAccessUserDto) {
    const existAccess = await this.accessUserRepository.findByAccess(
      createAccessUserDto.access,
    );

    if (existAccess) throw new ConflictException('Acesso já registrado');

    return this.accessUserRepository.create(createAccessUserDto);
  }

  async findAll() {
    return await this.accessUserRepository.findAll();
  }

  async findOne(id: number) {
    const exist = await this.accessUserRepository.findById(id);

    if (!exist) {
      throw new NotFoundException('Acesso de usuário não encontrado!');
    }

    return exist;
  }

  async remove(id: number) {
    const existId = await this.accessUserRepository.findById(id);

    if (!existId) throw new NotFoundException('Acesso informado não existe!');

    return await this.accessUserRepository.remove(id);
  }
}
