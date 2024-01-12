import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/AccessControl/auth/auth.module';
import { CryptModule } from 'src/AccessControl/crypt/crypt.module';
import { AccessUserService } from '../access-user/access-user.service';
import { AccessUserRepository } from '../access-user/access-user.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    PrismaService,
    AccessUserService,
    AccessUserRepository,
  ],
  imports: [AuthModule, CryptModule],
  exports: [UserService],
})
export class UserModule {}
