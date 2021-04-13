import ViewLayout from "../../components/ViewLayout";
import Head from "next/head";
import { Skeleton } from "antd";
import Api from "../../utils/api";
import styles from "../../styles/recipes.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import IngredientItem from "../../components/IngredientItem";
import debounce from "lodash/debounce";
import SearchElement from "../../components/SearchElement";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Formik } from "formik";
import { validateRecipe } from "../../utils/validation";

export default function add() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { JWT } = useAuth();
  const [query, setQuery] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
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
  async function saveRecipe({ name, ingredients, weight }) {
    setLoading(true);
    let formatedIngredients = ingredients.map((item) => {
      return {
        quantity: item.quantity,
        ingredientId: item._id,
      };
    });

    const newRecipe = {
      name,
      ingredients: formatedIngredients,
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
  function handleChange(e) {
    if (e.target.name === "name") {
      setName(e.target.value);
      return;
    }
    if (e.target.name === "weight") {
      setWeight(e.target.value);
      return;
    }
  }
  return (
    <ViewLayout title="Recipes" subTitle="Add" l>
      <Head>
        <title>Add Recipes - Nutrition cooking</title>
      </Head>
      <Formik
        enableReinitialize
        validate={validateRecipe}
        onSubmit={saveRecipe}
        initialValues={{
          name: name,
          ingredients: ingredientList,
          weight: weight,
        }}
      >
        {(formik) => (
          <form className="regular_form" onSubmit={formik.handleSubmit}>
            {error && <div className="error_box">{error}</div>}
            <br></br>
            <div className="form_group">
              <Input
                {...formik.getFieldProps("name")}
                onChange={handleChange}
                label="Name"
                error={formik.errors.name}
                touched={formik.touched.name}
                placeholder="Name of recipe"
              />
              <Input
                onBlur={debounce(blur, 500)}
                value={query}
                label="Search Ingredient"
                onChange={search}
                error={formik.errors.ingredients}
                touched={formik.touched.ingredients}
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
              {formik.values.ingredients.map((ingredient, index) => {
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
              <Input
                {...formik.getFieldProps("weight")}
                label="Total weight"
                type="number"
                error={formik.errors.weight}
                touched={formik.touched.weight}
                onChange={handleChange}
                placeholder="Weight in grams"
              ></Input>
            </div>
            <Button loading={loading}>Save</Button>
          </form>
        )}
      </Formik>
    </ViewLayout>
  );
}
