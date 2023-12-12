import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/CrudTables/user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CryptService } from 'src/AccessControl/crypt/crypt.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/CrudTables/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly cryptService: CryptService,
    private readonly jwtService: JwtService,
  ) {}

  private TOKEN_EXPERATION = '7 days';

  async login(body: LoginUserDto) {
    const existUser = await this.userService.findByEmail(body.email);
    if (!existUser) {
      throw new UnauthorizedException('Email ou senha invalida!');
    }
    const passwordIsValid = this.cryptService.compareHash(
      existUser.password,
      body.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException('Email ou senha invalida!');
    }

    return this.createToken(existUser);
  }

  async register(body: RegisterUserDto) {
    return this.userService.create(body);
  }

  private createToken(user: User) {
    const token = this.jwtService.sign(
      {
        name: user.name,
        id: user.id,
        access: user.user_access_id,
      },
      {
        expiresIn: this.TOKEN_EXPERATION,
      },
    );
    return token;
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token);
      return data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
