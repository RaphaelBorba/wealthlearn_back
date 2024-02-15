import { Module } from '@nestjs/common';

import { UserModule } from './CrudTables/user/user.module';
import { AccessUserModule } from './CrudTables/access-user/access-user.module';
import { TypeInvestmentModule } from './CrudTables/type-investment/type-investment.module';
import { ClassTypeModule } from './CrudTables/class-type/class-type.module';

import { CryptModule } from './AccessControl/crypt/crypt.module';
import { AuthModule } from './AccessControl/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { InvestmentsModule } from './CrudTables/investments/investments.module';
import { UserInvestmentsModule } from './CrudTables/user-investments/user-investments.module';
import { CalculatorsModule } from './calculators/calculators.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    CryptModule,
    AccessUserModule,
    TypeInvestmentModule,
    ClassTypeModule,
    InvestmentsModule,
    UserInvestmentsModule,
    CalculatorsModule,
  ],
})
export class AppModule {}
