import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DataStorageService } from '../../shared/data-storage.service';
import { unitToGrams } from '../../utils/ingredient-helpers';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) form: NgForm;
  ingredientSelectSub: Subscription;
  ingredientEditedId: string;
  isEditing = false;
  processingAction: 'upsert' | 'delete' | null = null;

  constructor(
    private shoppingListService: ShoppingListService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.ingredientSelectSub =
      this.shoppingListService.ingredientSelect.subscribe((ingId) => {
        this.isEditing = true;
        this.ingredientEditedId = ingId;

        const selectedIng = this.shoppingListService.getIngredient(ingId);
        this.form.setValue({
          name: selectedIng.name,
          amount: selectedIng.amount,
        });
      });
  }

  ngOnDestroy(): void {
    this.ingredientSelectSub.unsubscribe();
  }

  onSubmit(form: NgForm) {
    this.processingAction = 'upsert';

    // Creating an ingredient that is in grams
    const ingredient = new Ingredient(null, form.value.name, {
      value: unitToGrams(
        parseFloat(form.value.amount.value),
        form.value.amount.unit
      ),
      unit: 'g',
    });

    if (this.isEditing) {
      this.dataStorageService
        .updateShoppingListItem(this.ingredientEditedId, ingredient)
        .subscribe(() => {
          ingredient.id = this.ingredientEditedId;
          this.shoppingListService.updateIngredient(
            this.ingredientEditedId,
            ingredient
          );
          this.processingAction = null;
          this.clearForm();
        });
    } else {
      this.dataStorageService
        .addShoppingListItem(ingredient)
        .subscribe((res) => {
          ingredient.id = Object.keys(res)[0];

          this.shoppingListService.addIngredient(ingredient);
          this.processingAction = null;
          this.clearForm();
        });
    }
  }

  onDeletion() {
    this.processingAction = 'delete';

    this.dataStorageService
      .deleteShoppingListItem(this.ingredientEditedId)
      .subscribe(() => {
        this.shoppingListService.deleteIngredient(this.ingredientEditedId);
        this.processingAction = null;
        this.clearForm();
      });
  }

  clearForm() {
    this.form.reset();
    this.isEditing = false;
    this.ingredientEditedId = undefined;
  }
}
