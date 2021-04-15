import React from 'react'
import styles from '../styles/sass/components/nutritioninfo.module.scss';
import { caloriesPerPortion, fatPerPortion, carbPerPortion, proteinPerPortion } from "../functions";


export default function NutritionInformation({portion, ingredients, weight}) {
  const calories = caloriesPerPortion(ingredients, weight, portion);
  const fat = fatPerPortion(ingredients, weight, portion);
  const carbohydrate = carbPerPortion(ingredients, weight, portion);
  const protein = proteinPerPortion(ingredients, weight, portion);

  return (
    <div className={styles.info}>
      <div className={styles.bubble}>
        <div className={`${styles.quantity} ${styles.accent} md-14`}>{calories}</div>
        <div className={`${styles.unit} md-12`}>kcal</div>
        <div className={`${styles.unit_name} rg-10`}>Calories</div>
      </div>
      <div className={styles.bubble}>
        <div className={`${styles.quantity} md-14`}>{fat}</div>
        <div className={`${styles.unit} md-12`}>gr</div>
        <div className={`${styles.unit_name} rg-10`}>Fat</div>
      </div>
      <div className={styles.bubble}>
        <div className={`${styles.quantity} md-14`}>{carbohydrate}</div>
        <div className={`${styles.unit} md-12`}>gr</div>
        <div className={`${styles.unit_name} rg-10`}>Carbohydrate</div>
      </div>
      <div className={styles.bubble}>
        <div className={`${styles.quantity} md-14`}>{protein}</div>
        <div className={`${styles.unit} md-12`}>gr</div>
        <div className={`${styles.unit_name} rg-10`}>Protein</div>
      </div>
    </div>
  )
}
