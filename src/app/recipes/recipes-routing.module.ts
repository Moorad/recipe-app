import { RouterModule, Routes } from '@angular/router';
import { canActivateAuth } from '../auth/auth.guard';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeEmptyComponent } from './recipe-empty/recipe-empty.component';
import { recipesResolver } from './recipes-resolver.service';
import { RecipesComponent } from './recipes.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipeEmptyComponent },
      {
        path: 'new',
        component: RecipeEditComponent,
        canActivate: [canActivateAuth],
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [recipesResolver],
        canActivate: [canActivateAuth],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
