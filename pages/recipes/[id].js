import ViewLayout from "../../components/ViewLayout";
import Head from "next/head";
import {
  message,
  Row,
  Col,
  Input,
  Button,
  Skeleton,
  Alert,
  InputNumber,
  Typography,
} from "antd";
import { gold } from "@ant-design/colors";
import Api from "../../utils/api";
import styles from "../../styles/recipes.module.css";
import { useAuth } from "../../contexts/AuthContext";
import {caloriesPerPortion} from '../../functions'
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import IngredientItem from "../../components/IngredientItem";
import debounce from "lodash/debounce";
import SearchElement from "../../components/SearchElement";

export default function add() {
  const router = useRouter();
  const searchRef = useRef();
  const portionRef = useRef();
  const [portion, setPortion] = useState(100)
  const nameRef = useRef();
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false);
  const weightRef = useRef();
  const [weight, setWeight] = useState(0);
  const { JWT, currentUser } = useAuth();
  const [query, setQuery] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [error, setError] = useState("");
  //SWR
  const { data: ingredientsQueried, errorQuery } = useSWR(
    !query ? false : [`ingredients/search/?queryString=${query}`, JWT]
  );
  const { data: recipe, error: errorSWR, isValidating,  } = useSWR(
    !currentUser ? false : [`recipes/${router.query.id}`, JWT],{
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );
  //effects
  useEffect(() => {
    if(isValidating) return
    setName(recipe ? recipe.data.name: '')
    setWeight(recipe ? recipe.data.weight: 0)
    setIngredientList(recipe ? recipe.data.ingredients : [])
  },[isValidating])
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
    setError("");
    let ingredients = ingredientList.map((item) => {
      return {
        quantity: item.quantity,
        ingredientId: item._id,
      };
    });

    const newRecipe = {
      name,
      ingredients,
      weight,
    };
    try {
      await Api.put(`recipes/${router.query.id}`, newRecipe, {
        Authorization: `Bearer ${JWT}`,
      });
      mutate(["recipes", JWT])
      message.success("Recipe saved");
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
  function changeWeight () {
    if(isNaN(weightRef.current.input.value)) {
      return
    }
    setWeight(weightRef.current.input.value)
  }
  function changePortion() {
    if(isNaN(portionRef.current.input.value)){
      return
    }
    setPortion(portionRef.current.input.value)
  }
  //render
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
            <Input ref={nameRef} placeholder="Name" value={name} onChange={()=>setName(nameRef.current.input.value)} />
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
                  value={ingredient.quantity}
                  edit={(e) => {
                    editQuantity(e, index);
                  }}
                />
              );
            })}
          </Col>
          <Col span={24}>
            <Typography.Text>Total weight </Typography.Text>
            <InputNumber ref={weightRef} value={weight} onChange={changeWeight} size="small" min={0}></InputNumber>
          </Col>
          <Col span={24}>
            <InputNumber size="small" ref={portionRef} defaultValue={portion} onChange={changePortion} min={0}></InputNumber>
            <Typography.Title level={3} style={{color:gold[5]}}> Calories per portion: {caloriesPerPortion(ingredientList, weight, portion)} </Typography.Title>
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
