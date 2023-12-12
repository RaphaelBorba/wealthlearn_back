import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/AccessControl/auth/auth.module';
import { CryptModule } from 'src/AccessControl/crypt/crypt.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
  imports: [AuthModule, CryptModule],
  exports: [UserService],
})
export class UserModule {}
