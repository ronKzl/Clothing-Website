import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true,
})
export class PricePipe implements PipeTransform {
  transform(value: unknown, region: string = 'USA'): unknown {
    //Append a dolar sign
    if (region === 'EU') {
      return `${value}€`;
    }

    return `${value}$`;
  }
}
