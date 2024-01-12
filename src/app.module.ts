import { Module } from '@nestjs/common';

import { UserModule } from './CrudTables/user/user.module';
import { AccessUserModule } from './CrudTables/access-user/access-user.module';
import { TypeInvestmentModule } from './CrudTables/type-investment/type-investment.module';
import { ClassTypeModule } from './CrudTables/class-type/class-type.module';

import { CryptModule } from './AccessControl/crypt/crypt.module';
import { AuthModule } from './AccessControl/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    CryptModule,
    AccessUserModule,
    TypeInvestmentModule,
    ClassTypeModule,
  ],
})
export class AppModule {}
