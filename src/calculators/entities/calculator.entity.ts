export class SimpleTaxCalculator {
  amount: number;
  tax: number;
  time: number;
  typeTax: 'year' | 'month';
  typeTime: 'year' | 'month';
}

export class CompostTaxCalculator extends SimpleTaxCalculator {
  monthValue: number;
}
