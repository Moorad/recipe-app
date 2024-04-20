import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) form: NgForm;
  ingredientSelectSub: Subscription;
  isEditing = false;
  ingredientEditedId: number;

  constructor(private shoppingListService: ShoppingListService) {}

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
    const ingredient = new Ingredient(form.value.name, {
      value: parseFloat(form.value.amount.value),
      unit: form.value.amount.unit,
    });

    if (this.isEditing) {
      this.shoppingListService.updateIngredient(
        this.ingredientEditedId,
        ingredient
      );
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }

    this.clearForm();
  }

  onDeletion() {
    this.shoppingListService.deleteIngredient(this.ingredientEditedId);

    this.clearForm();
  }

  clearForm() {
    this.form.reset();
    this.isEditing = false;
    this.ingredientEditedId = undefined;
  }
}
