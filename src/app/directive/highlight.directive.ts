import { HostBinding, HostListener, Input } from '@angular/core';
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  el:ElementRef

  constructor(el:ElementRef) {
    this.el = el;
  }

  @HostListener("mouseenter") onMouseEnter(){
    this.el.nativeElement.style.backgroundColor = 'coral';
  }

  @HostListener("mouseleave") onMouseLeave(){
    this.el.nativeElement.style.backgroundColor = null;
  }
}
