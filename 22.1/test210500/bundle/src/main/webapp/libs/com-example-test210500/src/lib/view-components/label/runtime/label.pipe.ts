import { Pipe, PipeTransform } from '@angular/core';
import * as numeral from 'numeral';

@Pipe({name: 'decimalUnit'})
export class LabelPipe implements PipeTransform {
  constructor() {
    // This is done to address a bug in the NPM numeral library:
    // https://github.com/adamwdraper/Numeral-js/issues/503
    // if (numeral.locales['user-locale'] === undefined) {
    //   numeral.register('locale', 'user-locale', {});
    // }

    if (numeral.locales['ro'] === undefined) {
      numeral.register('locale', 'ro', {
        delimiters: {
          thousands: '.',
          decimal: ','
        },
        abbreviations: {
          thousand: 'k',
          million: 'm',
          billion: 'b',
          trillion: 't'
        },
        ordinal: function (number) {
          return number === 1 ? 'er' : 'ème';
        },
        currency: {
          symbol: 'RON'
        }
      });
    }

    numeral.locale('ro');
  }

  public transform(value: string, numDecimals: number) {
    const b = numeral(value);
    let x = '0,0.';
    for (let i = 0; i < numDecimals; i++) {
      x = x + '0';
    }

    return b.format(x);
  }
}
