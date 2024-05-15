import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTruncate]'
})
export class TruncateDirective implements OnInit {

  @Input() appTruncate!: number; // Initialized with ! to indicate it will be assigned later

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    const element = this.elementRef.nativeElement;
    const text = element.innerText;

    if (text.length > this.appTruncate) {
      element.innerText = text.substring(0, this.appTruncate) + '...';
    }
  }

}
