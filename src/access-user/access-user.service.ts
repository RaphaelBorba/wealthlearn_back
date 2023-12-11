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

  create(createAccessUserDto: CreateAccessUserDto) {
    const existAccess = this.accessUserRepository.findByAccess(
      createAccessUserDto.access,
    );

    if (existAccess) throw new ConflictException('Acesso já registrado');

    return this.accessUserRepository.create(createAccessUserDto);
  }

  findAll() {
    return this.accessUserRepository.findAll();
  }

  async remove(id: number) {
    const existId = await this.accessUserRepository.findById(id);

    if (!existId) throw new NotFoundException('Acesso informado não existe!');

    return await this.accessUserRepository.remove(id);
  }
}
