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
  const { JWT } = useAuth();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const { data: ingredientsQueried, errorQuery } = useSWR(
    !query ? false : [`ingredients/search/?queryString=${query}`, JWT]
  );

  const [error, setError] = useState("");
  //effects
  useEffect(() => {
    console.log(ingredientList);
  }, [ingredientList]);
  //functions
  function search() {
    setQuery(searchRef.current.input.value);
  }
  function blur() {
    setQuery("");
    searchRef.current.state.value = "";
    searchRef.current.input.value = "";
  }
  function addIngredient(item) {
    setIngredientList((prevState) => [...prevState, item]);
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
            <Input placeholder="Name" />
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
                      <li className={styles.no_results}>no recipes found</li>
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
              return <IngredientItem name={ingredient.name} />
            })}
          </Col>
        </Row>
      </form>
    </ViewLayout>
  );
}
