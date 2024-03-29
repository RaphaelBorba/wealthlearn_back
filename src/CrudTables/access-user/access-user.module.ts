import { Module } from '@nestjs/common';
import { AccessUserService } from './access-user.service';
import { AccessUserController } from './access-user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccessUserRepository } from './access-user.repository';
import { AuthModule } from 'src/AccessControl/auth/auth.module';
import { UserModule } from 'src/CrudTables/user/user.module';

@Module({
  controllers: [AccessUserController],
  providers: [AccessUserService, PrismaService, AccessUserRepository],
  imports: [AuthModule, UserModule],
  exports: [AccessUserService, AccessUserRepository],
})
export class AccessUserModule {}
