import { Controller, Post, Body } from '@nestjs/common';
import { CalculatorsService } from './calculators.service';
import {
  CompostTaxCalcuatorDto,
  SimpleTaxCalculatorDto,
} from './dto/create-calculator.dto';

@Controller('calculators')
export class CalculatorsController {
  constructor(private readonly calculatorsService: CalculatorsService) {}

  @Post('/simple-tax')
  simpleTaxCalculator(@Body() simpleCalculatorData: SimpleTaxCalculatorDto) {
    return this.calculatorsService.calculateSimpleTax(simpleCalculatorData);
  }

  @Post('/compost-tax')
  compostTaxCalculator(@Body() compostCalculatorData: CompostTaxCalcuatorDto) {
    return this.calculatorsService.calculateCompostTax(compostCalculatorData);
  }
}
