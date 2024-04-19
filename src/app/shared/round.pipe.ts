import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round',
})
export class RoundPipe implements PipeTransform {
  transform(value: string) {
    return Math.floor(Number(value) * 100) / 100;
  }
}
