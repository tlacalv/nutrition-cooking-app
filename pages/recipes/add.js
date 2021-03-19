import ViewLayout from "../../components/ViewLayout";
import Head from "next/head";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Skeleton,
  Alert,
  InputNumber,
  Typography,
} from "antd";
import Api from "../../utils/api";
import styles from "../../styles/recipes.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import IngredientItem from "../../components/IngredientItem";
import { nonZero, positiveNumberVal } from "../../utils/validation";
import debounce from "lodash/debounce";
import SearchElement from "../../components/SearchElement";

export default function add() {
  const router = useRouter();
  const searchRef = useRef();
  const nameRef = useRef();
  const [loading, setLoading] = useState(false);
  const weightRef = useRef();
  const { JWT } = useAuth();
  const [query, setQuery] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const { data: ingredientsQueried, errorQuery } = useSWR(
    !query ? false : [`ingredients/search/?queryString=${query}`, JWT]
  );

  const [error, setError] = useState("");
  //effects

  //functions
  function search() {
    setQuery(searchRef.current.input.value);
  }
  function blur() {
    setQuery("");
    searchRef.current.state.value = "";
    searchRef.current.input.value = "";
  }
  function removeIngredient(indexToRemove) {
    setIngredientList(
      ingredientList.filter((item, index) => {
        return index !== indexToRemove;
      })
    );
  }
  function addIngredient(item) {
    const newItem = { ...item, quantity: 0 };
    setIngredientList((prevState) => [...prevState, newItem]);
  }
  async function saveRecipe() {
    setLoading(true);
    let name = nameRef.current.state.value;
    let ingredients = ingredientList.map((item) => {
      return {
        quantity: item.quantity,
        ingredientId: item._id,
      };
    });
    let weight = weightRef.current.state.value;

    const newRecipe = {
      name,
      ingredients,
      weight,
    };
    try {
      await Api.post("recipes", newRecipe, {
        Authorization: `Bearer ${JWT}`,
      });
      router.push("/recipes");
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  }
  function editQuantity(value, index) {
    setIngredientList((prevVal) =>
      prevVal.map((item, ind) => {
        if (ind === index) {
          item.quantity = value;
        }
        return item;
      })
    );
  }
  return (
    <ViewLayout title="Add" subTitle="Recipes">
      <Head>
        <title>Add Recipes - Nutrition cooking</title>
      </Head>
      <form>
        {error && <Alert message={error} type="error" showIcon />}
        <br></br>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Input ref={nameRef} placeholder="Name" />
          </Col>
          <Col span={16} offset={4}>
            <div className={styles.search} tabIndex="20">
              <Input
                type="search"
                onBlur={debounce(blur, 500)}
                size="small"
                ref={searchRef}
                allowClear
                onChange={debounce(search, 500)}
                placeholder="Search for ingredient"
              />

              {query &&
                (!ingredientsQueried ? (
                  <div className={styles.skeleton_list}>
                    <Skeleton.Input
                      size="small"
                      className={styles.skeleton_item}
                      active
                    />
                    <Skeleton.Input
                      size="small"
                      className={styles.skeleton_item}
                      active
                    />
                    <Skeleton.Input
                      size="small"
                      className={styles.skeleton_item}
                      active
                    />
                  </div>
                ) : (
                  <ul className={styles.list}>
                    {ingredientsQueried.data.map((item, index) => (
                      <SearchElement
                        key={index}
                        name={item.name}
                        onClick={() => addIngredient(item)}
                      />
                    ))}
                    {ingredientsQueried.data.length === 0 ? (
                      <li className={styles.no_results}>
                        no ingredients found
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                ))}
            </div>
          </Col>
          <Col span={24}>Ingredient list</Col>
          <Col span={24}>
            {ingredientList.map((ingredient, index) => {
              return (
                <IngredientItem
                  key={index}
                  remove={() => removeIngredient(index)}
                  name={ingredient.name}
                  edit={(e) => {
                    editQuantity(e, index);
                  }}
                />
              );
            })}
          </Col>
          <Col span={24}>
            <Typography.Text>Total weight </Typography.Text>
            <InputNumber ref={weightRef} size="small" min={0}></InputNumber>
          </Col>
          <Col span={24}>
            <Button
              loading={loading}
              type="primary"
              size="large"
              onClick={saveRecipe}
            >
              Save{" "}
            </Button>
          </Col>
        </Row>
      </form>
    </ViewLayout>
  );
}
