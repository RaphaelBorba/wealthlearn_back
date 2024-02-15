import { Injectable } from '@nestjs/common';
import { CreateCalculatorDto } from './dto/create-calculator.dto';

type TimeTaxsElement = {
  time: number;
  tax: number;
  totalAmount: number;
  totalTax: number;
};

@Injectable()
export class CalculatorsService {
  /* simpleTaxCalculator(createCalculatorDto: CreateCalculatorDto) {
    console.log(createCalculatorDto);
    const amount = createCalculatorDto.amount;
    let tax = createCalculatorDto.tax / 100;
    if (createCalculatorDto.typeTime === 'year') {
      const years = createCalculatorDto.time;

      if (createCalculatorDto.typeTax === 'month') tax = tax * 12;
      console.log(tax);
      const timeTaxs: TimeTaxsElement[] = [];
      timeTaxs.push({ tax: 0, time: 0, totalAmount: amount, totalTax: 0 });
      for (let i = 0; i < years; i++) {
        const yearTax = tax * amount;
        timeTaxs.push({
          time: i + 1,
          tax: yearTax,
          totalTax: timeTaxs[timeTaxs.length - 1].totalTax + yearTax,
          totalAmount: timeTaxs[timeTaxs.length - 1].totalAmount + yearTax,
        });
      }
      return { timeType: 'year', timeTaxs };
    } else if (createCalculatorDto.typeTime === 'month') {
      const months = createCalculatorDto.time;

      if (createCalculatorDto.typeTax === 'year') tax = tax / 12;
      const timeTaxs: TimeTaxsElement[] = [];
      timeTaxs.push({ tax: 0, time: 0, totalAmount: amount, totalTax: 0 });
      for (let i = 0; i < months; i++) {
        const monthTax = tax * amount;
        timeTaxs.push({
          time: i + 1,
          tax: monthTax,
          totalTax: timeTaxs[timeTaxs.length - 1].totalTax + monthTax,
          totalAmount: timeTaxs[timeTaxs.length - 1].totalAmount + monthTax,
        });
      }
      return { timeType: 'month', timeTaxs };
    }
    return;
  } */

  calculateSimpleTax(createCalculatorDto: CreateCalculatorDto) {
    const {
      amount,
      tax: taxRate,
      typeTime,
      typeTax,
      time,
    } = createCalculatorDto;
    let tax = taxRate / 100;

    if (typeTime === 'year' && typeTax === 'month') tax *= 12;
    if (typeTime === 'month' && typeTax === 'year') tax /= 12;

    const timeTaxs: TimeTaxsElement[] = this.calculateTimeTaxes(
      time,
      amount,
      tax,
    );

    return { timeType: typeTime, timeTaxs };
  }

  calculateTimeTaxes(
    time: number,
    amount: number,
    tax: number,
  ): TimeTaxsElement[] {
    const timeTaxs: TimeTaxsElement[] = [
      { tax: 0, time: 0, totalAmount: amount, totalTax: 0 },
    ];

    for (let i = 0; i < time; i++) {
      const periodTax = tax * amount;
      const previous = timeTaxs[timeTaxs.length - 1];
      timeTaxs.push({
        time: i + 1,
        tax: periodTax,
        totalTax: previous.totalTax + periodTax,
        totalAmount: previous.totalAmount + periodTax,
      });
    }

    return timeTaxs;
  }
}
