import Layout from "../../components/Layout";
import Head from "next/head";
import { useAuth } from "../../contexts/AuthContext";
import SearchBar from "../../components/SearchBar";
import useSWR from "swr";
import { useState, useEffect } from "react";
import RecipeCard from "../../components/RecipeCard";
import SkeletonList from "../../components/SkeletonList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import debounce from "lodash/debounce";
import { useMasonry, onResize, MasonryItem } from "../../hooks/useMasonry";
import ButtonAdd from "../../components/ButtonAdd";

const itemsLenght = (recipes, recipesQueried, query) => {
  if (!query) {
    return recipes?.data ? recipes.data.length : 0;
  }
  return recipesQueried?.data ? recipesQueried.data.length : 0;
};
export default function Recipes() {
  const router = useRouter();
  const { elRefs, setElRefs } = useMasonry();
  const { currentUser, JWT } = useAuth();
  const [query, setQuery] = useState("");
  const { data: recipes, error } = useSWR(
    !currentUser ? false : ["recipes", JWT]
  );
  const { data: recipesQueried, errorQuery } = useSWR(
    !query ? false : [`recipes/search/?queryString=${query}`, JWT]
  );
  //Initialize refsArray
  setElRefs(itemsLenght(recipes, recipesQueried, query));

  useEffect(() => {
    onResize(elRefs);
  }, [elRefs.current, recipes, recipesQueried]);

  function search(e) {
    setQuery(e.target.value);
  }
  return (
    <Layout>
      <Head>
        <title>Recipes - Nutrition cooking</title>
      </Head>
      <SearchBar search={debounce(search, 1000)} />

      {!query ? (
        !(recipes || error) ? (
          <div className="flex">
            <SkeletonList elements={20} />
          </div>
        ) : (
          <div className="grid">
            {recipes.data.map((item, i) => (
              <MasonryItem>
                <RecipeCard
                  ref={elRefs.current[i]}
                  key={item._id}
                  recipe={item}
                />
              </MasonryItem>
            ))}

            <ButtonAdd
              type="button"
              className="addBtn"
              onClick={() => {
                router.push("/recipes/add");
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </ButtonAdd>
          </div>
        )
      ) : !(recipesQueried || errorQuery) ? (
        <div className="flex">
          <SkeletonList elements={20} />
        </div>
      ) : (
        <div className="grid">
          {recipesQueried.data.map((item, i) => (
            <MasonryItem>
              <RecipeCard
                ref={elRefs.current[i]}
                key={item._id}
                recipe={item}
              />
            </MasonryItem>
          ))}

          <ButtonAdd
            type="button"
            className="addBtn"
            onClick={() => {
              router.push("/recipes/add");
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </ButtonAdd>
        </div>
      )}
    </Layout>
  );
}
