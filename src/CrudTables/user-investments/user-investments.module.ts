import { Module } from '@nestjs/common';
import { UserInvestmentsService } from './user-investments.service';
import { UserInvestmentsController } from './user-investments.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserInvestmentsRepository } from './user-investments.repository';
import { UserModule } from '../user/user.module';
import { InvestmentsModule } from '../investments/investments.module';
import { AuthModule } from 'src/AccessControl/auth/auth.module';

@Module({
  controllers: [UserInvestmentsController],
  providers: [UserInvestmentsService, PrismaService, UserInvestmentsRepository],
  imports: [UserModule, InvestmentsModule, AuthModule],
})
export class UserInvestmentsModule {}
