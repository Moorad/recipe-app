import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

export const recipesResolver: ResolveFn<Recipe[]> = () => {
  const recipeService = inject(RecipeService);

  if (recipeService.recipes.length <= 0) {
    return inject(DataStorageService).fetchRecipes();
  } else {
    return recipeService.recipes;
  }
};
