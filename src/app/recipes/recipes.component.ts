import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent implements OnInit, OnDestroy {
  selectedRecipe: Recipe;
  recipeSelectSub: Subscription;

  constructor(private recipeService: RecipeService) {}

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
  }

  ngOnDestroy(): void {
    this.recipeSelectSub.unsubscribe();
  }
}
