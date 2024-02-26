import { Injectable } from '@nestjs/common';
import {
  CompostTaxCalcuatorDto,
  FinancialGoalCalculatorDto,
  SimpleTaxCalculatorDto,
} from './dto/create-calculator.dto';

type TimeTaxsElement = {
  time: number;
  tax: number;
  totalTax: number;
  totalAmount: number;
  investedMoney: number;
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
      {
        tax: 0,
        time: 0,
        totalTax: 0,
        investedMoney: amount,
        totalAmount: amount,
      },
    ];

    for (let i = 0; i < time; i++) {
      const periodTax = tax * amount;
      const previous = timeTaxs[timeTaxs.length - 1];
      timeTaxs.push({
        time: i + 1,
        tax: periodTax,
        investedMoney: amount,
        totalTax: previous.totalTax + periodTax,
        totalAmount: previous.totalAmount + periodTax,
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
        tax: actualTax,
        investedMoney: previous.investedMoney + monthValue,
        totalTax: previous.totalTax + actualTax,
        totalAmount: actualMoney + actualTax + monthValue,
      });
    }

    return { timeTaxs: data, timeType: 'month' };
  }

  calculateFinancialGoal(financialGoalData: FinancialGoalCalculatorDto) {
    const contributions = [
      50, 100, 200, 300, 400, 500, 1000, 2000, 3000, 5000, 10000, 15000, 20000,
      30000, 50000,
    ];
    const years = [10, 15, 20, 25, 30, 35, 40];
    const { amount, tax } = financialGoalData;
    const result = [];

    for (let i = 0; i < contributions.length; i++) {
      const contribution = contributions[i];
      const preFinal = [];
      for (let j = 0; j < years.length; j++) {
        const year = years[j];
        const final = this.FV(contribution, tax, year * 12, amount);

        preFinal.push(final);
      }
      result.push(preFinal);
    }
    return result;
  }

  FV(PMT: number, i: number, n: number, PV: number) {
    i = i / 100;

    return PV * Math.pow(1 + i, n) + (PMT * (Math.pow(1 + i, n) - 1)) / i;
  }
}
