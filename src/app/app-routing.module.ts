import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeEmptyComponent } from './recipes/recipe-empty/recipe-empty.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { recipesResolver } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { canActivateAuth } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipeEmptyComponent, resolve: [recipesResolver] },
      {
        path: 'new',
        component: RecipeEditComponent,
        canActivate: [canActivateAuth],
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [recipesResolver],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [recipesResolver],
        canActivate: [canActivateAuth],
      },
    ],
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
  },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
