import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Ingredient } from './ingredient.model';
import { generatePushID } from '../utils/firebase-push-id';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  fetchRecipes() {
    return this.http
      .get<Record<string, Record<string, Omit<Recipe, 'id'>>> | null>(
        'https://ng-recipe-app-dbf7b-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((res) => {
          if (res == null) {
            return null;
          }

          return Object.values(res)
            .map((userRecipes) =>
              Object.entries(userRecipes).map(([key, value]) => {
                return { ...value, id: key };
              })
            )
            .flat();
        })
      );
  }

  addRecipe(recipe: Recipe) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.post<{ name: string }>(
          `https://ng-recipe-app-dbf7b-default-rtdb.europe-west1.firebasedatabase.app/recipes/${user.id}.json`,
          recipe
        );
      })
    );
  }

  deleteRecipe(recipeId: string) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.delete(
          `https://ng-recipe-app-dbf7b-default-rtdb.europe-west1.firebasedatabase.app/recipes/${user.id}/${recipeId}.json`
        );
      })
    );
  }

  updateRecipe(recipeId: string, updatedRecipe: Recipe) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.put(
          `https://ng-recipe-app-dbf7b-default-rtdb.europe-west1.firebasedatabase.app/recipes/${user.id}/${recipeId}.json`,
          updatedRecipe
        );
      })
    );
  }

  fetchShoppingList() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http
          .get<Record<string, Omit<Ingredient, 'id'>> | null>(
            `https://ng-recipe-app-dbf7b-default-rtdb.europe-west1.firebasedatabase.app/shopping-list/${user.id}.json`
          )
          .pipe(
            map((res) => {
              if (res == null) {
                return null;
              }

              return Object.entries(res).map(([key, value]) => {
                return { ...value, id: key };
              });
            })
          );
      })
    );
  }

  addShoppingListItem(ingredient: Ingredient) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.post<{ name: string }>(
          `https://ng-recipe-app-dbf7b-default-rtdb.europe-west1.firebasedatabase.app/shopping-list/${user.id}.json`,
          ingredient
        );
      })
    );
  }

  addShoppingListItems(ingredients: Ingredient[]) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const keyedIngredients = ingredients.reduce((acc, curr) => {
          const pushId = generatePushID();
          return { ...acc, [pushId]: curr };
        }, {});

        return this.http.patch<Record<string, Ingredient>>(
          `https://ng-recipe-app-dbf7b-default-rtdb.europe-west1.firebasedatabase.app/shopping-list/${user.id}.json`,
          keyedIngredients
        );
      })
    );
  }

  deleteShoppingListItem(ingredientId: string) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.delete(
          `https://ng-recipe-app-dbf7b-default-rtdb.europe-west1.firebasedatabase.app/shopping-list/${user.id}/${ingredientId}.json`
        );
      })
    );
  }

  updateShoppingListItem(ingredientId: string, updatedIngredient: Ingredient) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.put(
          `https://ng-recipe-app-dbf7b-default-rtdb.europe-west1.firebasedatabase.app/shopping-list/${user.id}/${ingredientId}.json`,
          updatedIngredient
        );
      })
    );
  }
}
