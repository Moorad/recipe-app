import { Routes } from '@angular/router';

export const ROOT_ROUTES: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipe.routes').then((m) => m.RECIPES_ROUTES),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.routes').then(
        (m) => m.SHOPPING_LIST_ROUTES
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
];
