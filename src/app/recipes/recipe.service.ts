import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipes: Recipe[] = [];
  recipeSelect = new Subject<Recipe>();
  recipeChange = new ReplaySubject<Recipe[]>();

  getRecipe(id: string) {
    return this.recipes.find((recipe) => recipe.id == id);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChange.next(this.recipes);
  }

  updateRecipe(id: string, recipe: Recipe) {
    const recipeIndex = this.recipes.findIndex((recipe) => recipe.id == id);
    this.recipes[recipeIndex] = recipe;
    this.recipeChange.next(this.recipes);
  }

  deleteRecipe(id: string) {
    this.recipes = this.recipes.filter((recipe) => recipe.id != id);
    this.recipeChange.next(this.recipes);
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChange.next(this.recipes);
  }
}
