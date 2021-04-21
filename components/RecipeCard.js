import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/sass/components/card.module.scss";
import RecipeList from "./RecipeList";
import Api from "../utils/api";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import React, { useState } from 'react'
import NutritionInformation from "../components/NutritionInformation";
import { useAuth } from "../contexts/AuthContext";
import Message from './Message';
import CardButton from "../components/CardButton";



const RecipeCard = React.forwardRef((props, ref)  => {
  const [message, setMessage] = useState();
  const { JWT } = useAuth();
  const { recipe } = props;
  const { ingredients } = recipe;

  //functions
  async function onDelete() {
    setMessage()
    try {
      await Api.delete(
        `recipes/${recipe._id}`,
        {},
        { Authorization: `Bearer ${JWT}` }
      );
      mutate(["recipes", JWT]);
      setMessage("Element deleted");
    } catch (error) {
      message.error("Something went wrong while deleting");
      console.log(error);
    }
  }
  return (
    <>
      <div ref={ref} className={`${styles.card} card`}>
      { message && <Message success >{message}</Message>}
        <h2 className="md-26">{recipe.name}</h2>
        <div className={styles.ingredients}>
          <RecipeList ingredients={ingredients} />
        </div>
        <div className={styles.info}>
          <p>Portion size 100gr:</p>
          <NutritionInformation
            type="recipe"
            ingredients={ingredients}
            weight={recipe.weight}
          />
        </div>
        <div className={styles.footer}>
          <CardButton>
            <Link href={`/recipes/${recipe._id}`}>
              <FontAwesomeIcon icon={faEdit} />
            </Link>
          </CardButton>
          <CardButton onClick={() => onDelete()}>
            <FontAwesomeIcon icon={faTrash} />
          </CardButton>
        </div>
      </div>
    </>
  );
});
export default RecipeCard;