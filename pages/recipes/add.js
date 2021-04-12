import ViewLayout from "../../components/ViewLayout";
import Head from "next/head";
import { Skeleton, Alert } from "antd";
import Api from "../../utils/api";
import styles from "../../styles/recipes.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import IngredientItem from "../../components/IngredientItem";
import debounce from "lodash/debounce";
import SearchElement from "../../components/SearchElement";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Formik } from "formik";

export default function add() {
  const router = useRouter();
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
  function search(e) {
    setQuery(e.target.value);
  }
  function blur(e) {
    setQuery("");
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
  function editQuantity(e, index) {
    let value = e.target.value;
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
    <ViewLayout title="Recipes" subTitle="Add">
      <Head>
        <title>Add Recipes - Nutrition cooking</title>
      </Head>
      <Formik
        enableReinitialize
        initialValues={{
          name: "et",
          ingredients: ingredientList,
          weight: "",
        }}
      >
        {(formik) => (
          <form className="regular_form" onSubmit={formik.handleSubmit}>
            {error && <div className="error_box">{error}</div>}
            <br></br>
            <div className="form_group">
            <Input
              {...formik.getFieldProps("name")}
              label="Name"
              placeholder="Name of recipe"
            />
            <Input
              onBlur={debounce(blur, 500)}
              value={query}
              label="Search Ingredient"
              onChange={search}
              placeholder="Search for ingredient"
            />
            <div className={styles.search} tabIndex="20">
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
            </div>
            <div className="form_group">
            <p>Ingredient list</p>
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
            </div>
            <Input
              {...formik.getFieldProps("weight")}
              label="Total weight"
              type="number"
              placeholder="Weight in grams"
            ></Input>

            <Button loading={loading}>Save</Button>
          </form>
        )}
      </Formik>
    </ViewLayout>
  );
}
