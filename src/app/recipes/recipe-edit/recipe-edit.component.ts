import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { CommonModule } from '@angular/common';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
})
export class RecipeEditComponent implements OnInit {
  id: string;
  isEditing = false;
  recipeForm: FormGroup;
  isProcessingAction = false;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.isEditing = params['id'] != null;

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
      const recipe = this.recipeService.getRecipe(this.id);
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
      null,
      name,
      description,
      imageUrl,
      ingredients,
      method
    );

    this.isProcessingAction = true;

    if (this.isEditing) {
      this.dataStorageService.updateRecipe(this.id, newRecipe).subscribe(() => {
        newRecipe.id = this.id;
        this.recipeService.updateRecipe(this.id, newRecipe);
        // Navigate back to edited recipe
        this.onCancel();
      });
    } else {
      this.dataStorageService.createRecipe(newRecipe).subscribe((res) => {
        newRecipe.id = res.name;
        this.recipeService.addRecipe(newRecipe);
        this.router.navigate(['/recipes', res.name]);
      });
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
