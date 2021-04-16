import React from "react";
import InformationLabels from "./InformationLabels";
import {
  caloriesPerPortion,
  fatPerPortion,
  carbPerPortion,
  proteinPerPortion,
} from "../functions";

export default function NutritionInformation({
  portion = 100,
  ingredients,
  weight,
  type,
  ...props
}) {

  let calories, fat, carbohydrate, protein;

  if (type === "recipe") {
    calories = caloriesPerPortion(ingredients, weight, portion);
    fat = fatPerPortion(ingredients, weight, portion);
    carbohydrate = carbPerPortion(ingredients, weight, portion);
    protein = proteinPerPortion(ingredients, weight, portion);
  } else {
    calories = props.calories;
    fat = props.fat;
    carbohydrate = props.carbohydrate;
    protein = props.protein;
  }
  return (
    <InformationLabels
      calories={calories}
      fat={fat}
      carbohydrate={carbohydrate}
      protein={protein}
    />
  );
}
