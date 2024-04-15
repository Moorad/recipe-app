import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  overwriteRecipes() {
    const recipes = this.recipeService.recipes;

    this.http
      .put(
        'https://ng-recipe-app-dbf7b-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe();
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
