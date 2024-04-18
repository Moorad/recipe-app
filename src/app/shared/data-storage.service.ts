import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { take, tap } from 'rxjs';
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

  overwriteRecipes() {
    const recipes = this.recipeService.recipes;

    this.authService.user.pipe(take(1)).subscribe(() => {
      this.http
        .put(
          'https://ng-recipe-app-dbf7b-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
          recipes
        )
        .subscribe();
    });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-recipe-app-dbf7b-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        tap((res) => {
          this.recipeService.setRecipes(res);
        })
      );
  }
}
