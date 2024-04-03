import { Component, EventEmitter, Input, Output } from '@angular/core';

type PagesType = 'recipes' | 'shopping-list';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isCollapsed = true;
  active: PagesType = 'recipes';
  @Output() pageChange = new EventEmitter<PagesType>();

  onPageChange(pageName) {
    this.active = pageName;
    this.pageChange.emit(this.active);
  }
}
