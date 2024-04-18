import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  isLoadingRecipe = true;
  recipeChangeSub: Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeChangeSub = this.recipeService.recipeChange.subscribe(
      (recipes) => {
        this.recipes = recipes;
        this.isLoadingRecipe = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.recipeChangeSub.unsubscribe();
  }

  sequenceArray(n: number) {
    return Array(n).fill(0);
  }
}
