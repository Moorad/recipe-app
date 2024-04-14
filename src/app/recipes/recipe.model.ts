import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public name: string;
  public description: string;
  public imageUrl: string;
  public ingredients: Ingredient[];

  constructor(
    name: string,
    desc: string,
    imageUrl: string,
    ingredents: Ingredient[]
  ) {
    this.name = name;
    this.description = desc;
    this.imageUrl = imageUrl;
    this.ingredients = ingredents;
  }
}
