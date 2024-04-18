import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipes: Recipe[] = [];
  recipeSelect = new Subject<Recipe>();
  recipeChange = new ReplaySubject<Recipe[]>();

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChange.next(this.recipes);
  }

  updateRecipe(id: number, recipe: Recipe) {
    this.recipes[id] = recipe;
    this.recipeChange.next(this.recipes);
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipeChange.next(this.recipes);
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChange.next(this.recipes);
  }
}
