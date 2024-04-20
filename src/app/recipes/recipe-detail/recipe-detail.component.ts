import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipeDetailSkeletonComponent } from './recipe-detail-skeleton/recipe-detail-skeleton.component';

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
  id: number;
  isLoadingRecipe = true;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = Number(params['id']);
      this.recipe = this.recipeService.getRecipe(this.id);
    });

    this.recipeService.recipeChange.subscribe(() => {
      this.recipe = this.recipeService.getRecipe(this.id);
      this.isLoadingRecipe = false;
    });
  }

  onToShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
    this.router.navigate(['/shopping-list']);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
