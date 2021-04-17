import React from "react";
import styles from '../styles/sass/components/card.module.scss';

export default function RecipeTable(props) {
  return (
    <ul className={styles.ingredient_list}>
      {props.ingredients.map((ingredientData) => {
          return (
            <li className={`rg-16 ${styles.ingredient_item}`} key={ingredientData._id}>
              {ingredientData.quantity}gr {ingredientData.name}
            </li>
          );
        })}
    </ul>
  );
}
