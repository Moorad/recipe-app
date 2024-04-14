import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredients = [new Ingredient('Flour', 300), new Ingredient('Tomato', 5)];
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
