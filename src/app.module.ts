import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CryptModule } from './crypt/crypt.module';
import { AccessUserModule } from './access-user/access-user.module';

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
