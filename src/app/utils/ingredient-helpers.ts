import { Ingredient } from '../shared/ingredient.model';
import { Unit } from '../shared/ingredient.model';

export function convertToGrams(value: number, unit: Unit) {
  switch (unit) {
    case 'g':
      return value;
    case 'kg':
      return value * 1000;
    case 'l':
      return value * 1000;
    case 'ml':
      return value;
    case 'cup':
      return value * 226;
    case 'tsp':
      return value * 5.69;
    case 'tbsp':
      return value * 14.175;
  }
}

export function copyIngredientsIntoGrams(ingredients: Ingredient[]) {
  return ingredients.map((ing) => {
    return new Ingredient(ing.name, {
      value: convertToGrams(ing.amount.value, ing.amount.unit),
      unit: 'g',
    });
  });
}

// Ingredients must be converted to grams beforehand
export function groupIngredients(ingredients: Ingredient[]) {
  let copiedArray = Array.from(ingredients);
  let groupedIngredients = [];
  for (let i = 0; i < copiedArray.length; i++) {
    let currentIng = copiedArray[i];
    groupedIngredients.push(currentIng);

    for (let j = i + 1; j < copiedArray.length; ) {
      if (copiedArray[j].name == currentIng.name) {
        const mergedAmntVal =
          copiedArray[j].amount.value + currentIng.amount.value;

        currentIng.amount = {
          value: mergedAmntVal,
          unit: 'g',
        };

        copiedArray.splice(j, 1);
      } else {
        j++;
      }
    }
  }

  return groupedIngredients;
}
