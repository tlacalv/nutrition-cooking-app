import React from "react";
import styles from "../styles/list.module.css";
import { gold } from "@ant-design/colors";


export default function RecipeTable(props) {
  return (
    <table className={styles.table}>
      <thead>
        <tr style={{backgroundColor: gold[1]}}>
          <th>Ingredient</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {props.ingredients.map((ingredientData) => {
          return (
            <tr key={ingredientData._id}>
                <td>{ingredientData.name}</td>
                <td>{ingredientData.quantity}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
