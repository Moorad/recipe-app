import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
  providers: [RecipeService],
})
export class RecipesComponent implements OnInit, OnDestroy {
  selectedRecipe: Recipe;
  recipeChangeSub: Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeChangeSub = this.recipeService.recipeChange.subscribe({
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
    this.recipeChangeSub.unsubscribe();
  }
}
