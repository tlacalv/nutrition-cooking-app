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

export default function Recipes() {
  const router = useRouter();
  const { currentUser, JWT } = useAuth();
  const [query, setQuery] = useState("");
  const { data: recipes, error } = useSWR(
    !currentUser ? false : ["recipes", JWT]
  );
  const { data: recipesQueried, errorQuery } = useSWR(
    !query ? false : [`recipes/search/?queryString=${query}`, JWT]
  );

  function search(e) {
    setQuery(e.target.value);
  }
  return (
    <Layout>
      <Head>
        <title>Recipes - Nutrition cooking</title>
      </Head>
      <SearchBar search={debounce(search, 1000)} />

      <Row gutter={8} className={styles.list} justify="center">
        {!query ? (
          !(recipes || error) ? (
            <SkeletonList elements={20} />
          ) : (
            <>
              {recipes.data.map((item) => (
                <IngredientCard key={item._id} ingredient={item} />
              ))}

              <Button
                type="primary"
                className={styles.addBtn}
                icon={<FontAwesomeIcon icon={faPlus} />}
                shape="circle"
                onClick={() => {
                  router.push("/recipes/add");
                }}
              ></Button>
            </>
          )
        ) : !(recipesQueried || errorQuery) ? (
          <SkeletonList elements={20} />
        ) : (
          <>
            {recipesQueried.data.map((item) => (
              <IngredientCard key={item._id} ingredient={item} />
            ))}

            <Button
              type="primary"
              className={styles.addBtn}
              icon={<FontAwesomeIcon icon={faPlus} />}
              shape="circle"
              onClick={() => {
                router.push("/recipes/add");
              }}
            ></Button>
          </>
        )}
      </Row>
    </Layout>
  );
}
