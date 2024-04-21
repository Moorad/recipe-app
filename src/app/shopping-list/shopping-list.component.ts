import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { CommonModule } from '@angular/common';
import { RoundPipe } from '../shared/round.pipe';
import { ShoppingListSkeletonComponent } from './shopping-list-skeleton/shopping-list-skeleton.component';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  standalone: true,
  imports: [
    ShoppingListEditComponent,
    ShoppingListSkeletonComponent,
    CommonModule,
    RoundPipe,
  ],
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  ingredientsDiff: number[] = [];
  ingredientChangeSub: Subscription;
  ingredientsDiffSub: Subscription;
  isLoading = true;

  constructor(
    private shoppingListService: ShoppingListService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.dataStorageService.fetchShoppingList().subscribe((ingredients) => {
      this.shoppingListService.setIngredients(ingredients);
      this.isLoading = false;
    });

    this.ingredientChangeSub =
      this.shoppingListService.ingredientChange.subscribe((ingredients) => {
        this.ingredients = ingredients;
      });

    this.ingredientsDiffSub = this.shoppingListService.ingredientDiff.subscribe(
      (changedIndices) => {
        this.ingredientsDiff = changedIndices;
      }
    );
  }

  onSelect(id: number) {
    this.shoppingListService.ingredientSelect.next(id);
  }

  ngOnDestroy(): void {
    this.ingredientChangeSub.unsubscribe();
    this.ingredientsDiffSub.unsubscribe();
    this.shoppingListService.ingredientDiff.next([]);
  }
}
