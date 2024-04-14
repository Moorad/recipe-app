import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
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
    let ingredientName = form.value.name;
    let ingredientAmount = parseInt(form.value.amount);

    if (this.isEditing) {
      this.shoppingListService.updateIngredient(
        this.ingredientEditedId,
        new Ingredient(ingredientName, ingredientAmount)
      );
    } else {
      this.shoppingListService.addIngredient(
        new Ingredient(ingredientName, ingredientAmount)
      );
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
