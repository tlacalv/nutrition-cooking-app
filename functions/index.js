export function caloriesPerPortion(ingredients, totalWeight, portionSize=100) {
  let totalCalories = 0;
  ingredients.forEach(ingredient => {
    totalCalories += (ingredient.calories/100) * ingredient.quantity
  });
  totalCalories /= totalWeight
  totalCalories *= portionSize
  if(isNaN(totalCalories)) return ''
  if(totalCalories === Number.POSITIVE_INFINITY) return ''
  return Math.round(totalCalories);
}
export function fatPerPortion(ingredients, totalWeight, portionSize=100) {
  let totalFat = 0;
  ingredients.forEach(ingredient => {
    totalFat += (ingredient.fat/100) * ingredient.quantity
  });
  totalFat /= totalWeight
  totalFat *= portionSize
  if(isNaN(totalFat)) return ''
  if(totalFat === Number.POSITIVE_INFINITY) return ''
  return Math.round(totalFat);
}
export function carbPerPortion(ingredients, totalWeight, portionSize=100) {
  let totalCarb = 0;
  ingredients.forEach(ingredient => {
    totalCarb += (ingredient.carbohydrate/100) * ingredient.quantity
  });
  totalCarb /= totalWeight
  totalCarb *= portionSize
  if(isNaN(totalCarb)) return ''
  if(totalCarb === Number.POSITIVE_INFINITY) return ''
  return Math.round(totalCarb);
}
export function proteinPerPortion(ingredients, totalWeight, portionSize=100) {
  let totalProtein = 0;
  ingredients.forEach(ingredient => {
    totalProtein += (ingredient.protein/100) * ingredient.quantity
  });
  totalProtein /= totalWeight
  totalProtein *= portionSize
  if(isNaN(totalProtein)) return ''
  if(totalProtein === Number.POSITIVE_INFINITY) return ''
  return Math.round(totalProtein);
}
export function classList(classes) {
  return Object
    .entries(classes)
    .filter(entry => entry[1])
    .map(entry => entry[0])
    .join(' ')
}