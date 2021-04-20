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
  const arrLenght = recipes?.data ? recipes.data.length : 0;
  setElRefs(arrLenght);

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

      <div className="grid">
        {!query ? (
          !(recipes || error) ? (
            <SkeletonList elements={20} />
          ) : (
            <>
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
            </>
          )
        ) : !(recipesQueried || errorQuery) ? (
          <SkeletonList elements={20} />
        ) : (
          <>
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
          </>
        )}
      </div>
    </Layout>
  );
}
