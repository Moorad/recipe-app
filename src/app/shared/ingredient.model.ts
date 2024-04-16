type Unit = 'g' | 'kg' | 'tsp' | 'tbsp' | 'cup' | 'ml' | 'l';

type Amount = {
  value: number;
  unit: Unit;
};
export class Ingredient {
  constructor(public name: string, public amount: Amount) {}
}
