import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-list-skeleton',
  standalone: true,
  imports: [NgFor],
  templateUrl: './shopping-list-skeleton.component.html',
})
export class ShoppingListSkeletonComponent {}
