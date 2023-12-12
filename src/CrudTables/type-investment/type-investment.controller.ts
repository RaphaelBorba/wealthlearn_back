import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TypeInvestmentService } from './type-investment.service';
import { CreateTypeInvestmentDto } from './dto/create-type-investment.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('type-investment')
@UseGuards(AuthGuard(true))
export class TypeInvestmentController {
  constructor(private readonly typeInvestmentService: TypeInvestmentService) {}

  @Post()
  create(@Body() createTypeInvestmentDto: CreateTypeInvestmentDto) {
    return this.typeInvestmentService.create(createTypeInvestmentDto);
  }

  @Get()
  findAll() {
    return this.typeInvestmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeInvestmentService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeInvestmentService.remove(+id);
  }
}
