import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  ingredientsDiff: number[] = [];
  ingredientChangeSub: Subscription;
  ingredientsDiffSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
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
