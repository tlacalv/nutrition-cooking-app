import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button, Typography, InputNumber } from "antd";
import styles from '../styles/recipes.module.css';

export default function IngredientItem(props) {
  return (
    <div className={styles.ingredient_item}>
      <Button
        shape="circle"
        onClick={props.remove}
        type="text"
        icon={<FontAwesomeIcon icon={faTimes} />}
      />
      <Typography.Text className={styles.ingredient_name} strong>{props.name}</Typography.Text>
      <div className={styles.ingredient_input}>
        <Typography.Text className={styles.label_input}>Quantity</Typography.Text>
        <InputNumber style={{width:'100%'}} size="small" min={0} onChange={props.edit} defaultValue={props.value}></InputNumber>

      </div>
    </div>
  );
}
