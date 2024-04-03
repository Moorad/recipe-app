import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnChanges,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen: boolean = false;

  constructor(
    private element: ElementRef<HTMLButtonElement>,
    private renderer: Renderer2
  ) {}

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    if (this.element.nativeElement.contains(event.target as HTMLElement)) {
      this.isOpen = !this.isOpen;
    } else {
      this.isOpen = false;
    }

    let dropdownMenu = this.renderer.nextSibling(this.element.nativeElement);

    if (this.isOpen) {
      this.renderer.addClass(dropdownMenu, 'show');
    } else {
      this.renderer.removeClass(dropdownMenu, 'show');
    }
  }
}
