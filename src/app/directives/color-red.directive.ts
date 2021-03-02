import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appColorRed]'
})
export class ColorRedDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.color = '#e35f6c';
  }
}
