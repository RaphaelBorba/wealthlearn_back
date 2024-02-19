import { Injectable } from '@nestjs/common';
import {
  CompostTaxCalcuatorDto,
  SimpleTaxCalculatorDto,
} from './dto/create-calculator.dto';

type TimeTaxsElement = {
  time: number;
  tax: number;
  amount: number;
  totalTax: number;
};

@Injectable()
export class CalculatorsService {
  calculateSimpleTax(simpleTaxCalculatorDto: SimpleTaxCalculatorDto) {
    const {
      amount,
      tax: taxRate,
      typeTime,
      typeTax,
      time,
    } = simpleTaxCalculatorDto;
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
      { tax: 0, time: 0, amount: amount, totalTax: 0 },
    ];

    for (let i = 0; i < time; i++) {
      const periodTax = tax * amount;
      const previous = timeTaxs[timeTaxs.length - 1];
      timeTaxs.push({
        time: i + 1,
        tax: periodTax,
        totalTax: previous.totalTax + periodTax,
        amount,
      });
    }

    return timeTaxs;
  }

  calculateCompostTax(compostTaxCalculatorDto: CompostTaxCalcuatorDto) {
    const {
      amount,
      monthValue,
      tax: taxRate,
      time,
      typeTime,
    } = compostTaxCalculatorDto;
    const tax = taxRate / 100;
    const totalTime = typeTime === 'year' ? time * 12 : time;
    const data = [
      {
        time: 0,
        tax: 0,
        investedMoney: amount,
        totalTax: 0,
        totalAmount: amount,
      },
    ];

    for (let i = 0; i < totalTime; i++) {
      const previous = data[data.length - 1];
      const actualMoney = previous.totalAmount;
      const actualTax = actualMoney * tax;

      data.push({
        time: i + 1,
        tax: parseFloat(actualTax.toFixed(2)),
        investedMoney: parseFloat(
          (previous.investedMoney + monthValue).toFixed(2),
        ),
        totalTax: parseFloat((previous.totalTax + actualTax).toFixed(2)),
        totalAmount: parseFloat(
          (actualMoney + actualTax + monthValue).toFixed(2),
        ),
      });
    }

    return data;
  }
}
