import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredients = [new Ingredient('Flour', 300), new Ingredient('Tomato', 5)];

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients = this.ingredients.concat(ingredients);
  }
}
