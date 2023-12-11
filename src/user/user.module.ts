import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { CryptModule } from 'src/crypt/crypt.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
  imports: [AuthModule, CryptModule],
  exports: [UserService],
})
export class UserModule {}
