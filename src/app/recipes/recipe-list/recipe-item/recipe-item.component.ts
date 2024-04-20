import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { TruncatePipe } from '../../../shared/truncate.pipe';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [TruncatePipe, RouterModule],
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Input() id: number;
}
