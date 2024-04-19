import { BehaviorSubject, Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';
import {
  convertToGrams,
  groupIngredients,
  copyIngredientsIntoGrams,
} from '../utils/ingredient-helpers';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredients: Ingredient[] = [];
  ingredientSelect = new Subject<number>();
  ingredientChange = new BehaviorSubject<Ingredient[]>([]);
  ingredientDiff = new BehaviorSubject<number[]>([]);

  getIngredient(id: number) {
    return this.ingredients[id];
  }

  addIngredient(ingredient: Ingredient) {
    // Convert new ingredient to grams
    ingredient.amount = {
      value: convertToGrams(ingredient.amount.value, ingredient.amount.unit),
      unit: 'g',
    };

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

  updateIngredient(id: number, ingredient: Ingredient) {
    ingredient.amount = {
      value: convertToGrams(ingredient.amount.value, ingredient.amount.unit),
      unit: 'g',
    };

    this.ingredients[id] = ingredient;
    this.ingredientChange.next(this.ingredients);
    this.ingredientDiff.next([id]);
  }

  deleteIngredient(id: number) {
    this.ingredients.splice(id, 1);
    this.ingredientChange.next(this.ingredients);
    // Clear ingredients changed
    this.ingredientDiff.next([]);
  }
}
