import { Injectable } from '@nestjs/common';
import { CreateCalculatorDto } from './dto/create-calculator.dto';

@Injectable()
export class CalculatorsService {
  simpleTaxCalculator(createCalculatorDto: CreateCalculatorDto) {
    if (createCalculatorDto.typeTime === 'year') {
      const months = createCalculatorDto.time;
    }

    return 1;
  }
}
