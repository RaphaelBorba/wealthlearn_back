import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { CryptService } from 'src/AccessControl/crypt/crypt.service';
import { AccessUserService } from '../access-user/access-user.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptService: CryptService,
    private readonly accessUserService: AccessUserService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existEmail = await this.userRepository.findEmail(createUserDto.email);

    if (existEmail) throw new ConflictException('Email já existente!');

    await this.accessUserService.findOne(createUserDto.user_access_id);

    try {
      const newUser = await this.userRepository.create({
        ...createUserDto,
        password: this.cryptService.hash(createUserDto.password),
      });

      return newUser;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro no Servidor!');
    }
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne(id);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findEmail(email);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existUser = await this.userRepository.findOne(id);

    if (!existUser) throw new NotFoundException('Usuário não encontrado!');

    try {
      const userUpdated = this.userRepository.update(id, updateUserDto);

      return userUpdated;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Erro no servidor!');
    }
  }

  async remove(id: number) {
    const existUser = await this.userRepository.findOne(id);

    if (!existUser) throw new NotFoundException('Usuário não encontrado');

    try {
      await this.userRepository.remove(id);

      return 'Usuário deletado';
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro no servidor!');
    }
  }
}
