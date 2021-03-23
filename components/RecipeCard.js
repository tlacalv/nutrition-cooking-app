import { Col, Card, Row, Typography, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { gold } from "@ant-design/colors";
import RecipeTable from './RecipeTable'
import styles from "../styles/list.module.css";
import Api from "../utils/api";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import { useAuth } from "../contexts/AuthContext";

const { Title } = Typography;

export default function RecipeCard(props) {
  const { JWT } = useAuth();
  const { recipe } = props;
  const { ingredients } = recipe

  //functions
  async function onDelete() {
    try {
      await Api.delete(
        `recipes/${recipe._id}`,
        {},
        { Authorization: `Bearer ${JWT}` }
      );
      mutate(["recipes", JWT]);
      message.success("Element deleted");
    } catch (error) {
      message.error("Something went wrong while deleting");
      console.log(error);
    }
  }
  function onEdit() {}
  function caloriesPerPortion(ingredients, totalWeight, portionSize=100) {
    let totalCalories = 0;
    ingredients.forEach(ingredient => {
      totalCalories += (ingredient.calories/100) * ingredient.quantity
    });
    totalCalories /= totalWeight
    totalCalories *= portionSize
    return Math.round(totalCalories);
  }
  return (
    <>
      <Col>
        <Card
          title={<Title level={4}>{recipe.name}</Title>}
          headStyle={{ background: gold[3] }}
          bodyStyle={{ padding: 0 }}
          style={{ minWidth: 300 }}
          actions={[
            <Link href={`/recipes/${recipe._id}`}>
              <FontAwesomeIcon style={{ width: "100%" }} icon={faEdit} />
            </Link>,
            <FontAwesomeIcon
              style={{ width: "100%" }}
              onClick={onDelete}
              icon={faTrash}
            />,
          ]}
        >
          <Row>
            <Col flex="auto">
              <RecipeTable ingredients={ingredients} />
            </Col>
          </Row>
          <Row>
            <Col offset={1}>
              <Title level={5} style={{color:gold[5]}}>Calories per portion: {caloriesPerPortion(ingredients, recipe.weight)}</Title>
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  );
}
