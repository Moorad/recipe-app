import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent implements OnInit, OnDestroy {
  selectedRecipe: Recipe;
  recipeSelectSub: Subscription;
  recipeFetchSub: Subscription;

  constructor(
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.recipeSelectSub = this.recipeService.recipeSelect.subscribe({
      next: (recipe) => {
        this.selectedRecipe = recipe;
      },
      error: (err) => {
        console.log(err);
        alert('An error occured while changing selected recipe');
      },
    });

    this.recipeFetchSub = this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.recipeSelectSub.unsubscribe();
  }
}
