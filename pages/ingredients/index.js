import Layout from "../../components/Layout";
import Head from "next/head";
import { useAuth } from "../../contexts/AuthContext";
import SearchBar from "../../components/SearchBar";
import useSWR from "swr";
import { useState } from "react";
import { Row, Button } from "antd";
import styles from "../../styles/list.module.css";
import IngredientCard from "../../components/IngredientCard";
import SkeletonList from "../../components/SkeletonList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import debounce from "lodash/debounce";
import ButtonAdd from '../../components/ButtonAdd';

export default function Ingredients() {
  const router = useRouter();
  const { currentUser, JWT } = useAuth();
  const [query, setQuery] = useState("");
  const { data: ingredients, error } = useSWR(
    !currentUser ? false : ["ingredients", JWT]
  );
  const { data: ingredientsQueried, errorQuery } = useSWR(
    !query ? false : [`ingredients/search/?queryString=${query}`, JWT]
  );

  function search(e) {
    setQuery(e.target.value);
  }
  return (
    <Layout>
      <Head>
        <title>Ingredients - Nutrition cooking</title>
      </Head>
      <SearchBar search={debounce(search, 1000)} />

      <Row gutter={8} className={styles.list} justify="center">
        {!query ? (
          !(ingredients || error) ? (
            <SkeletonList elements={20} />
          ) : (
            <>
              {ingredients.data.map((item) => (
                <IngredientCard key={item._id} ingredient={item} />
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
        ) : !(ingredientsQueried || errorQuery) ? (
          <SkeletonList elements={20} />
        ) : (
          <>
            {ingredientsQueried.data.map((item) => (
              <IngredientCard key={item._id} ingredient={item} />
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
      </Row>
    </Layout>
  );
}
