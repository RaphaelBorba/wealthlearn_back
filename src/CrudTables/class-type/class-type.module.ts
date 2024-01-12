import { Module } from '@nestjs/common';
import { ClassTypeService } from './class-type.service';
import { ClassTypeController } from './class-type.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClassTypeRepository } from './class-type.repository';
import { TypeInvestmentModule } from '../type-investment/type-investment.module';

@Module({
  controllers: [ClassTypeController],
  providers: [ClassTypeService, PrismaService, ClassTypeRepository],
  imports: [TypeInvestmentModule],
})
export class ClassTypeModule {}
