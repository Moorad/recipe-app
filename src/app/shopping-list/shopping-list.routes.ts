import { Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';
import { canActivateAuth } from '../auth/auth.guard';

export const SHOPPING_LIST_ROUTES: Routes = [
  {
    path: '',
    component: ShoppingListComponent,
    canActivate: [canActivateAuth],
  },
];
