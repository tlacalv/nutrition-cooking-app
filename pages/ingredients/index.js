import Layout from "../../components/Layout";
import Head from "next/head";
import { useAuth } from "../../contexts/AuthContext";
import SearchBar from "../../components/SearchBar";
import useSWR from "swr";
import { useState, useEffect } from "react";
import IngredientCard from "../../components/IngredientCard";
import SkeletonList from "../../components/SkeletonList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useMasonry, onResize, MasonryItem } from "../../hooks/useMasonry";
import { useRouter } from "next/router";
import debounce from "lodash/debounce";
import ButtonAdd from "../../components/ButtonAdd";

const itemsLenght = (ingredients, ingredientsQueried, query) => {
  if (!query) {
    return ingredients?.data ? ingredients.data.length : 0;
  }
  return ingredientsQueried?.data ? ingredientsQueried.data.length : 0;
};

export default function Ingredients() {
  const { elRefs, setElRefs } = useMasonry();
  const router = useRouter();
  const { currentUser, JWT } = useAuth();
  const [query, setQuery] = useState("");
  const { data: ingredients, error } = useSWR(
    !currentUser ? false : ["ingredients", JWT]
  );
  const { data: ingredientsQueried, errorQuery } = useSWR(
    !query ? false : [`ingredients/search/?queryString=${query}`, JWT]
  );
  //Initialize refsArray
  setElRefs(itemsLenght(ingredients, ingredientsQueried, query));

  useEffect(() => {
    onResize(elRefs);
  }, [elRefs.current, ingredients, ingredientsQueried]);
  function search(e) {
    setQuery(e.target.value);
  }
  return (
    <Layout>
      <Head>
        <title>Ingredients - Nutrition cooking</title>
      </Head>
      <SearchBar search={debounce(search, 1000)} />
      {!query ? (
        !(ingredients || error) ? (
          <div className="flex">
            <SkeletonList elements={10} />
          </div>
        ) : (
          <div className="grid">
            {ingredients.data.map((item, i) => (
              <MasonryItem>
                <IngredientCard
                  ref={elRefs.current[i]}
                  key={item._id}
                  ingredient={item}
                />
              </MasonryItem>
            ))}

            <ButtonAdd
              type="button"
              className="addBtn"
              onClick={() => {
                router.push("/ingredients/add");
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </ButtonAdd>
          </div>
        )
      ) : !(ingredientsQueried || errorQuery) ? (
        <div className="flex">
          <SkeletonList elements={10} />
        </div>
      ) : (
        <div className="grid">
          {ingredientsQueried.data.map((item, i) => (
            <MasonryItem>
              <IngredientCard
                ref={elRefs.current[i]}
                key={item._id}
                ingredient={item}
              />
            </MasonryItem>
          ))}

          <ButtonAdd
            type="button"
            className="addBtn"
            onClick={() => {
              router.push("/ingredients/add");
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </ButtonAdd>
        </div>
      )}
    </Layout>
  );
}
