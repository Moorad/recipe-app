import { Ingredient } from '../shared/ingredient.model';
import { Unit } from '../shared/ingredient.model';
import { generatePushID } from './firebase-push-id';

export function unitToGrams(value: number, unit: Unit) {
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

// Clone ingredient
export function cloneIngredient(ingredient: Ingredient) {
  return new Ingredient(ingredient.id, ingredient.name, {
    value: ingredient.amount.value,
    unit: ingredient.amount.unit,
  });
}

// In-place convert ingredient to grams
export function InPlaceIngredientToGrams(ingredient: Ingredient) {
  ingredient.amount = {
    value: unitToGrams(ingredient.amount.value, ingredient.amount.unit),
    unit: 'g',
  };
}

// Clone original items from original list returned if found
// Originl item returned if item is new
export function differenceOfIngredients(
  originalList: Ingredient[],
  newIngredients: Ingredient[]
) {
  const diff: Ingredient[] = [];

  newIngredients.forEach((newIng) => {
    const matchFound = originalList.find(
      (originalIng) =>
        originalIng.name.toLowerCase() == newIng.name.toLowerCase()
    );

    if (matchFound) {
      diff.push(cloneIngredient(matchFound));
    }

    diff.push(newIng);
  });

  return diff;
}

// In-place merge ingredients
export function mergeIngredients(ingredients: Ingredient[]) {
  for (let i = 0; i < ingredients.length; i++) {
    let currentIng = ingredients[i];

    for (let j = i + 1; j < ingredients.length; ) {
      if (ingredients[j].name.toLowerCase() == currentIng.name.toLowerCase()) {
        currentIng.amount.value += ingredients[j].amount.value;

        ingredients.splice(j, 1);
      } else {
        j++;
      }
    }
  }
}

// // Convert ingredients into a format that is PATCH-able into firebase RTDB
export function toPATCHRequestFormat(ingredients: Ingredient[]) {
  return ingredients.reduce((acc, curr) => {
    if (curr.id) {
      return {
        ...acc,
        [curr.id]: {
          name: curr.name,
          amount: curr.amount,
        },
      };
    }

    return { ...acc, [generatePushID()]: curr };
  }, {});
}
