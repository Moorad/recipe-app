import { BehaviorSubject, Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { mergeIngredients } from '../utils/ingredient-helpers';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredients: Ingredient[] = [];
  ingredientSelect = new Subject<string>();
  ingredientChange = new BehaviorSubject<Ingredient[]>([]);
  ingredientDiff = new BehaviorSubject<string[]>([]);

  getIngredient(id: string) {
    return this.ingredients.find((ing) => ing.id == id);
  }

  setIngredients(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
    this.ingredientChange.next(this.ingredients);
  }

  addIngredient(ingredient: Ingredient) {
    // Group old with new (remove dups)
    this.ingredients.push(ingredient);

    mergeIngredients(this.ingredients);

    this.ingredientChange.next(this.ingredients);
    // Notify of changed ingredients in list by index
    this.ingredientDiff.next([ingredient.id]);
  }

  updateIngredient(id: string, updatedIngredient: Ingredient) {
    const ingIndex = this.ingredients.findIndex((ing) => ing.id == id);

    this.ingredients[ingIndex] = updatedIngredient;
    this.ingredientChange.next(this.ingredients);
    this.ingredientDiff.next([id]);
  }

  deleteIngredient(id: string) {
    this.ingredients = this.ingredients.filter((ing) => ing.id != id);
    this.ingredientChange.next(this.ingredients);
    // Clear ingredients changed
    this.ingredientDiff.next([]);
  }
}
