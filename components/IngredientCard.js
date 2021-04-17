import { message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/sass/ingredient.module.scss";
import Api from "../utils/api";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import { useAuth } from "../contexts/AuthContext";
import NutritionInformation from "../components/NutritionInformation";
import CardButton from "../components/CardButton";

export default function IngredientCard(props) {
  const { JWT } = useAuth();
  const { ingredient } = props;
  async function onDelete() {
    try {
      await Api.delete(
        `ingredients/${ingredient._id}`,
        {},
        { Authorization: `Bearer ${JWT}` }
      );
      mutate(["ingredients", JWT]);
      message.success("Element deleted");
    } catch (error) {
      message.error("Something went wrong while deleting");
      console.log(error);
    }
  }
  return (
    <div className={styles.card}>
      <h2 className="md-26">{ingredient.name}</h2>
      <div className={styles.info}>
        <p>Portion size 100gr:</p>
        <NutritionInformation
          type="ingredient"
          calories={ingredient.calories}
          fat={ingredient.fat}
          carbohydrate={ingredient.carbohydrate}
          protein={ingredient.protein}
        />
      </div>
      <div className={styles.footer}>
        <CardButton>
          <Link href={`/ingredients/${ingredient._id}`}>
            <FontAwesomeIcon icon={faEdit} />
          </Link>
        </CardButton>
        <CardButton onClick={()=>onDelete()}>
          <FontAwesomeIcon icon={faTrash} />
        </CardButton>
      </div>
    </div>
  );
}
