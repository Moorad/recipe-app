import { Component } from '@angular/core';

type PagesType = 'recipes' | 'shopping-list';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isCollapsed = true;
}
