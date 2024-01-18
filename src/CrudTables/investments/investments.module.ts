import { Module } from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { InvestmentsController } from './investments.controller';
import { InvestmentsRepository } from './investments.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClassTypeModule } from '../class-type/class-type.module';

@Module({
  controllers: [InvestmentsController],
  providers: [InvestmentsService, InvestmentsRepository, PrismaService],
  imports: [ClassTypeModule],
})
export class InvestmentsModule {}
