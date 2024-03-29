import RecipeLayout from "../../components/RecipeLayout";
import Head from "next/head";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Api from "../../utils/api";
import styles from "../../styles/sass/recipe.module.scss";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import IngredientItem from "../../components/IngredientItem";
import debounce from "lodash/debounce";
import SearchElement from "../../components/SearchElement";
import Input from "../../components/Input";
import Button from "../../components/Button";
import NutritionInformation from "../../components/NutritionInformation";
import { useFormik } from "formik";
import SkeletonInfo from "../../components/SkeletonInfo";

const skeletonColorsDark = {
  color: "#aaafb6",
  highlightColor: "#d9d9d9",
};
const skeletonColors = {
  color: "#d9d9d9",
  highlightColor: "#e6e6e6",
};

export default function Recipe() {
  const router = useRouter();
  const [portion, setPortion] = useState(100);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [weight, setWeight] = useState(0);
  const { JWT, currentUser } = useAuth();
  const [query, setQuery] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [error, setError] = useState("");
  //SWR
  const { data: ingredientsQueried, errorQuery } = useSWR(
    !query ? false : [`ingredients/search/?queryString=${query}`, JWT]
  );
  const { data: recipe, error: errorSWR, isValidating } = useSWR(
    !currentUser ? false : [`recipes/${router.query.id}`, JWT],
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  //formik
  const formik = useFormik({
    initialValues: {
      name: name,
      ingredients: ingredientList,
      weight: weight,
    },
    onSubmit: saveRecipe,
    enableReinitialize: true,
  });
  //effects
  useEffect(() => {
    if (isValidating) return;
    setName(recipe ? recipe.data.name : "");
    setWeight(recipe ? recipe.data.weight : 0);
    setIngredientList(recipe ? recipe.data.ingredients : []);
  }, [isValidating]);
  //functions
  function search(e) {
    setQuery(e.target.value);
  }
  function blur() {
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
    setError("");
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
      await Api.put(`recipes/${router.query.id}`, newRecipe, {
        Authorization: `Bearer ${JWT}`,
      });
      mutate(["recipes", JWT]);
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
    if (e.target.name === "portion") {
      setPortion(e.target.value);
      return;
    }
  }
  //render
  return (
    <RecipeLayout title="Recipes" subTitle="Edit" loading={loading}>
      <Head>
        <title>Edit Recipes - Nutrition cooking</title>
      </Head>

      <section className={styles.header_section}>
        <SkeletonTheme {...skeletonColorsDark}>
          <h1 className={`${styles.title} md-26`}>
            {recipe ? name : <Skeleton height={30} width={300} />}
          </h1>
          <div className={styles.header_inputs}>
            {recipe ? (
              <>
                <Input
                  {...formik.getFieldProps("weight")}
                  label="Total weight"
                  type="number"
                  whiteLabel
                  small
                  error={formik.errors.weight}
                  touched={formik.touched.weight}
                  onChange={handleChange}
                  placeholder="gm"
                />
                <Input
                  value={portion}
                  name="portion"
                  label="Portion"
                  whiteLabel
                  small
                  type="number"
                  error={formik.errors.weight}
                  touched={formik.touched.weight}
                  onChange={handleChange}
                  placeholder="gm"
                />
              </>
            ) : (
              <>
                <Skeleton width={80} height={30} />
                <Skeleton width={80} height={30} />
              </>
            )}
          </div>
          <div className={styles.nutrition_info}>
            {recipe ? (
              <NutritionInformation
                portion={portion}
                ingredients={ingredientList}
                weight={weight}
                type="recipe"
              />
            ) : (
              <SkeletonInfo />
            )}
          </div>
        </SkeletonTheme>
      </section>
      <form className="compact_form" onSubmit={formik.handleSubmit}>
        <SkeletonTheme {...skeletonColors}>
          {error && <div className="error_box">{error}</div>}
          <br></br>
          <div className="form_group">
            {recipe ? (
              <>
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
              </>
            ) : (
              <>
                <Skeleton height={35} />
                <Skeleton height={35} />
              </>
            )}

            <div className={styles.search} tabIndex="20">
              {query &&
                (!ingredientsQueried ? (
                  <div className={styles.skeleton_list}>
                    <Skeleton height={30} />
                    <Skeleton height={30} />
                    <Skeleton height={30} />
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
            {recipe ? (
              formik.values.ingredients.map((ingredient, index) => {
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
              })
            ) : (
              <>
                <Skeleton height={50} />
                <Skeleton height={50} />
                <Skeleton height={50} />
                <Skeleton height={50} />
              </>
            )}
          </div>
        </SkeletonTheme>
        {recipe ? <Button loading={loading}>Save</Button> : null}
      </form>
    </RecipeLayout>
  );
}
