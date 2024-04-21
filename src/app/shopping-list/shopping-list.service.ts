import { BehaviorSubject, Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';
import {
  groupIngredients,
  copyIngredientsIntoGrams,
} from '../utils/ingredient-helpers';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredients: Ingredient[] = [];
  ingredientSelect = new Subject<string>();
  ingredientChange = new BehaviorSubject<Ingredient[]>([]);
  ingredientDiff = new BehaviorSubject<number[]>([]);

  getIngredient(id: string) {
    return this.ingredients.find((ing) => ing.id == id);
  }

  setIngredients(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
    this.ingredientChange.next(this.ingredients);
  }

  addIngredient(ingredient: Ingredient) {
    // Group old with new (remove dups)
    const groupedIngredients = groupIngredients(
      this.ingredients.concat(ingredient)
    );

    this.ingredients = groupedIngredients;
    this.ingredientChange.next(this.ingredients);
    // Notify of changed ingredients in list by index
    this.ingredientDiff.next([
      this.ingredients.findIndex((ing) => ing.name == ingredient.name),
    ]);
  }

  addIngredients(ingredients: Ingredient[]) {
    // Copy ingredients to avoid modifying instance used in /recipes
    let copiedIngredients = copyIngredientsIntoGrams(ingredients);

    const groupedIngredients = groupIngredients(
      this.ingredients.concat(copiedIngredients)
    );

    this.ingredients = groupedIngredients;
    this.ingredientChange.next(this.ingredients);
    this.ingredientDiff.next(
      ingredients.map((ing) =>
        this.ingredients.findIndex((i) => i.name == ing.name)
      )
    );
  }

  updateIngredient(id: string, ingredient: Ingredient) {
    const ingIndex = this.ingredients.findIndex((ing) => ing.id == id);
    this.ingredients[ingIndex] = ingredient;
    this.ingredientChange.next(this.ingredients);
    this.ingredientDiff.next([ingIndex]);
  }

  deleteIngredient(id: string) {
    this.ingredients = this.ingredients.filter((ing) => ing.id != id);
    this.ingredientChange.next(this.ingredients);
    // Clear ingredients changed
    this.ingredientDiff.next([]);
  }
}
