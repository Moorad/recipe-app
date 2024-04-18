import { NgModule } from '@angular/core';
import { RecipeDetailSkeletonComponent } from './recipe-detail/recipe-detail-skeleton/recipe-detail-skeleton.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeEmptyComponent } from './recipe-empty/recipe-empty.component';
import { RecipeItemSkeletonComponent } from './recipe-list/recipe-item/recipe-item-skeleton/recipe-item-skeleton.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeItemComponent,
    RecipeItemSkeletonComponent,
    RecipeDetailComponent,
    RecipeDetailSkeletonComponent,
    RecipesComponent,
    RecipeEditComponent,
    RecipeEmptyComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    RecipeRoutingModule,
    SharedModule,
  ],
})
export class RecipesModule {}
