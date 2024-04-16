import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
})
export class RecipeEditComponent implements OnInit {
  id: number;
  isEditing = false;
  recipeEditedId: number;
  recipeForm: FormGroup;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = Number(params['id']);
      this.isEditing = params['id'] != null;

      if (this.isEditing) {
        this.recipeEditedId = params['id'];
      }

      this.initForm();
    });
  }

  initForm() {
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    let recipeMethod = new FormArray([]);

    if (this.isEditing) {
      const recipe = this.recipeService.getRecipe(this.recipeEditedId);
      recipeName = recipe.name;
      recipeImageUrl = recipe.imageUrl;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        recipe['ingredients'].forEach((ing) => {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ing.name, Validators.required),
              amount: new FormGroup({
                value: new FormControl(ing.amount.value, [
                  Validators.required,
                  Validators.min(1),
                ]),
                unit: new FormControl(ing.amount.unit, Validators.required),
              }),
            })
          );
        });
      }

      if (recipe['method']) {
        recipe['method'].forEach((step) => {
          recipeMethod.push(new FormControl(step, [Validators.required]));
        });
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imageUrl: new FormControl(recipeImageUrl, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
      method: recipeMethod,
    });
  }

  onSubmit() {
    const { name, imageUrl, description, ingredients, method } =
      this.recipeForm.value;

    const newRecipe = new Recipe(
      name,
      description,
      imageUrl,
      ingredients,
      method
    );

    if (this.isEditing) {
      this.recipeService.updateRecipe(this.recipeEditedId, newRecipe);
      // Navigate back to edited recipe
      this.onCancel();
    } else {
      this.recipeService.addRecipe(newRecipe);
      this.router.navigate(['/recipes', this.recipeService.recipes.length - 1]);
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onIngredientAdd() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormGroup({
          value: new FormControl(null, [
            Validators.required,
            Validators.min(1),
          ]),
          unit: new FormControl(null, Validators.required),
        }),
      })
    );
  }

  onIngredientDelete(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onStepAdd() {
    (this.recipeForm.get('method') as FormArray).push(
      new FormControl(null, Validators.required)
    );
  }

  onStepDelete(index: number) {
    (this.recipeForm.get('method') as FormArray).removeAt(index);
  }

  get ingControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  get methodControls() {
    return (this.recipeForm.get('method') as FormArray).controls;
  }
}
