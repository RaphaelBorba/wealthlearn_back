import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './CrudTables/user/user.module';
import { AuthModule } from './AccessControl/auth/auth.module';
import { CryptModule } from './AccessControl/crypt/crypt.module';
import { AccessUserModule } from './CrudTables/access-user/access-user.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    CryptModule,
    AccessUserModule,
  ],
})
export class AppModule {}
