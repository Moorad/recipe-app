import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeItemSkeletonComponent } from './recipe-item/recipe-item-skeleton/recipe-item-skeleton.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    RecipeItemComponent,
    RecipeItemSkeletonComponent,
    CommonModule,
    RouterModule,
  ],
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
}
