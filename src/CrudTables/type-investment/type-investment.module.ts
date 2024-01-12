import { Module } from '@nestjs/common';
import { TypeInvestmentService } from './type-investment.service';
import { TypeInvestmentController } from './type-investment.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TypeInvestmentRepository } from './type-investment.repository';
import { AuthModule } from 'src/AccessControl/auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [TypeInvestmentController],
  providers: [TypeInvestmentService, PrismaService, TypeInvestmentRepository],
  exports: [TypeInvestmentService],
  imports: [AuthModule, UserModule],
})
export class TypeInvestmentModule {}
