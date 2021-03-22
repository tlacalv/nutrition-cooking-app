import React from "react";
import styles from "../styles/list.module.css";
import { gold } from "@ant-design/colors";

import {Skeleton} from 'antd'

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
            <tr key={ingredientData.id}>
              {ingredientData.data ? <>
                <td>{ingredientData.data.data?.name}</td>
                <td>{ingredientData?.quantity}</td>
              
              </>:

              <>
                <td>
                  <Skeleton.Input active className={styles.skeleton_td} />
                </td>
                <td>
                  <Skeleton.Input active className={styles.skeleton_td} />
                </td>
              </>
              }
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
