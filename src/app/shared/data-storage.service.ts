import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Ingredient } from './ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import {
  differenceOfIngredients,
  mergeIngredients,
  toPATCHRequestFormat,
} from '../utils/ingredient-helpers';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private shoppingListService: ShoppingListService,
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

          return Object.entries(res)
            .map(([userId, userRecipes]) =>
              Object.entries(userRecipes).map(([key, value]) => {
                return { ...value, id: key, creatorId: userId };
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
    const difference = differenceOfIngredients(
      this.shoppingListService.ingredients,
      [ingredient]
    );

    mergeIngredients(difference);

    const request = toPATCHRequestFormat(difference);

    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.patch<{ [key: string]: Ingredient }>(
          `https://ng-recipe-app-dbf7b-default-rtdb.europe-west1.firebasedatabase.app/shopping-list/${user.id}.json`,
          request
        );
      })
    );
  }

  addShoppingListItems(ingredients: Ingredient[]) {
    const difference = differenceOfIngredients(
      this.shoppingListService.ingredients,
      ingredients
    );

    mergeIngredients(difference);

    const request = toPATCHRequestFormat(difference);

    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.patch<Record<string, Ingredient>>(
          `https://ng-recipe-app-dbf7b-default-rtdb.europe-west1.firebasedatabase.app/shopping-list/${user.id}.json`,
          request
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

  fetchUserData(userId: string) {
    return this.http.get<{ username: string }>(
      `https://ng-recipe-app-dbf7b-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`
    );
  }

  deleteAllShoppingListItems() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.delete(
          `https://ng-recipe-app-dbf7b-default-rtdb.europe-west1.firebasedatabase.app/shopping-list/${user.id}.json`
        );
      })
    );
  }
}
