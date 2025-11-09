import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boldItalic'
})
export class BoldItalicPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return `<b><i>${value}</i></b>`;
  }

}
