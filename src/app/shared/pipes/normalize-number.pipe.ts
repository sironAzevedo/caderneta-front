import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'normalizeNumber'
  })
export class NormalizeNumberPipe implements PipeTransform {
    transform(value: any, args?: any) {
        return value
        .replace(/^R\$ */, '')
        .replace(/\./g, '')
        .replace(/%/g, '');
    }
}