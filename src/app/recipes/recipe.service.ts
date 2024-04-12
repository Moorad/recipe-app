import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class RecipeService {
  recipes = [
    new Recipe(
      'Cheesecake',
      'A delicious cheesecake',
      'https://www.allrecipes.com/thmb/DHosjm3NundSDP1q6wWEEECYwr8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8419-easy-sour-cream-cheesecake-DDMFS-beauty-4x3-BG-2747-44b427d330aa41aa876269b1249698a0.jpg',
      [
        new Ingredient('Cream Cheese', 1),
        new Ingredient('Sugar', 3),
        new Ingredient('Vanilla Extract', 1),
        new Ingredient('Eggs', 3),
        new Ingredient('Butter', 4),
      ]
    ),
    new Recipe(
      'Italian Pizza',
      'Freshly baked italian pizza',
      'https://www.allrecipes.com/thmb/fFW1o307WSqFFYQ3-QXYVpnFj6E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/48727-Mikes-homemade-pizza-DDMFS-beauty-4x3-BG-2974-a7a9842c14e34ca699f3b7d7143256cf.jpg',
      [
        new Ingredient('Pizza Dough', 4),
        new Ingredient('Tomato Sauce', 5),
        new Ingredient('Mozzarella Cheese', 7),
        new Ingredient('Fresh Basil', 2),
      ]
    ),
    new Recipe(
      'Steak',
      'A medium rare steak',
      'https://www.seriouseats.com/thmb/-KA2hwMofR2okTRndfsKtapFG4Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__05__Anova-Steak-Guide-Sous-Vide-Photos15-beauty-159b7038c56a4e7685b57f478ca3e4c8.jpg',
      [
        new Ingredient('Sirloin Steak', 1),
        new Ingredient('Salt and Pepper', 3),
        new Ingredient('Butter', 4),
      ]
    ),
  ];
  recipeChange = new Subject<Recipe>();

  getRecipeById(id: number) {
    return this.recipes[id];
  }
}
