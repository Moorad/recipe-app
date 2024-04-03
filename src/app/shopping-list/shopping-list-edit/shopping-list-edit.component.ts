import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
})
export class ShoppingListEditComponent {
  @ViewChild('nameInputRef', { static: true })
  nameInput: ElementRef<HTMLInputElement>;
  @ViewChild('amountInputRef', { static: true })
  amountInput: ElementRef<HTMLInputElement>;

  constructor(private shoppingListService: ShoppingListService) {}

  onIngredientAdd() {
    let ingredientName = this.nameInput.nativeElement.value;
    let ingredientAmount = parseInt(this.amountInput.nativeElement.value);

    // Exit if either input is empty
    if (!ingredientName || isNaN(ingredientAmount)) {
      return;
    }

    this.shoppingListService.addIngredient(
      new Ingredient(ingredientName, ingredientAmount)
    );

    this.clearForm();
  }

  clearForm() {
    this.nameInput.nativeElement.value = '';
    this.amountInput.nativeElement.value = '';
  }
}
