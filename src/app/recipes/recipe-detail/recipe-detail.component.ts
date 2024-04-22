import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipeDetailSkeletonComponent } from './recipe-detail-skeleton/recipe-detail-skeleton.component';
import { DataStorageService } from '../../shared/data-storage.service';
import {
  InPlaceIngredientToGrams,
  cloneIngredient,
} from '../../utils/ingredient-helpers';

@Component({
  standalone: true,
  imports: [
    RecipeDetailSkeletonComponent,
    CommonModule,
    NgbDropdownModule,
    RouterModule,
  ],
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: string;
  isLoadingRecipe = true;
  isProcessingAction = false;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });

    this.recipeService.recipeChange.subscribe(() => {
      this.recipe = this.recipeService.getRecipe(this.id);
      this.isLoadingRecipe = false;
    });
  }

  onToShoppingList() {
    this.isProcessingAction = true;

    const ingredientsInGrams = this.recipe.ingredients.map((ing) => {
      const cloned = cloneIngredient(ing);
      InPlaceIngredientToGrams(cloned);

      return cloned;
    });

    this.dataStorageService
      .addShoppingListItems(ingredientsInGrams)
      .subscribe((res) => {
        this.shoppingListService.ingredientDiff.next(Object.keys(res));
        this.router.navigate(['/shopping-list']);
      });
  }

  onDeleteRecipe() {
    this.isProcessingAction = true;
    this.dataStorageService.deleteRecipe(this.recipe.id).subscribe(() => {
      this.recipeService.deleteRecipe(this.id);
      this.router.navigate(['/recipes']);
    });
  }
}
