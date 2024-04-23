import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  constructor(
    public id: string,
    public creatorId: string,
    public name: string,
    public description: string,
    public imageUrl: string,
    public ingredients: Ingredient[],
    public method: string[]
  ) {}
}
