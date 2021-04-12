import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Input from './Input'
import styles from '../styles/sass/components/ingredientitem.module.scss';

export default function IngredientItem(props) {
  return (
    <div className={styles.ingredient_item}>
      <div className={styles.head}>
        <button
        className={styles.close}
          onClick={props.remove}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <p className={`${styles.ingredient_name} md-14`}>{props.name}</p>

      </div>
      <div className={styles.ingredient_input}>
        <Input  small type="number" label="Quantity" onChange={props.edit} value={props.value} />

      </div>
    </div>
  );
}
