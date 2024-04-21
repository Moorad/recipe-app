import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  createRecipe(recipe: Recipe) {
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

  fetchRecipes() {
    return this.http
      .get<Record<string, Record<string, Omit<Recipe, 'id'>>>>(
        'https://ng-recipe-app-dbf7b-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((res) => {
          return Object.values(res)
            .map((userRecipes) =>
              Object.entries(userRecipes).map(([key, value]) => {
                return { ...value, id: key };
              })
            )
            .flat();
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
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
}
