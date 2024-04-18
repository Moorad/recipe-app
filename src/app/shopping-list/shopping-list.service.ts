import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredients = [
    new Ingredient('Flour', {
      value: 12,
      unit: 'kg',
    }),
    new Ingredient('Tomato', {
      value: 5,
      unit: 'kg',
    }),
  ];
  ingredientSelect = new Subject<number>();

  getIngredient(id: number) {
    return this.ingredients[id];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients = this.ingredients.concat(ingredients);
  }

  updateIngredient(id: number, ingredient: Ingredient) {
    this.ingredients[id] = ingredient;
  }

  deleteIngredient(id: number) {
    this.ingredients.splice(id, 1);
  }
}
