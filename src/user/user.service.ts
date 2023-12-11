import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { CryptService } from 'src/crypt/crypt.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptService: CryptService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existEmail = await this.userRepository.findEmail(createUserDto.email);
    if (existEmail) throw new ConflictException('Email já existente!');

    return this.userRepository.create({
      ...createUserDto,
      password: this.cryptService.hash(createUserDto.password),
    });
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findEmail(email);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
