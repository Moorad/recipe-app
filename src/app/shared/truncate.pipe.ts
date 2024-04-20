import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, max: number) {
    if (value.length > max) {
      return value.slice(0, max) + '...';
    }

    return value;
  }
}
