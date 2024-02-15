import { Controller, Post, Body } from '@nestjs/common';
import { CalculatorsService } from './calculators.service';
import { CreateCalculatorDto } from './dto/create-calculator.dto';

@Controller('calculators')
export class CalculatorsController {
  constructor(private readonly calculatorsService: CalculatorsService) {}

  @Post('/simple-tax')
  create(@Body() createCalculatorDto: CreateCalculatorDto) {
    return this.calculatorsService.simpleTaxCalculator(createCalculatorDto);
  }
}
