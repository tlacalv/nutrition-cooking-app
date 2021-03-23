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