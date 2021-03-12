import Layout from "../../components/Layout";
import Head from "next/head";
import { useAuth } from "../../contexts/AuthContext";
import SearchBar from "../../components/SearchBar";
import useSWR from "swr";
import { Row, Button } from "antd";
import styles from "../../styles/list.module.css";
import ElementsList from "../../components/ElementsList";
import SkeletonList from "../../components/SkeletonList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function Ingredients() {
  const router = useRouter()
  const { currentUser, JWT } = useAuth();
  const { data: ingredients, error } = useSWR(
    !currentUser ? false : ["ingredients", JWT]
  );
  return (
    <Layout>
      <Head>
        <title>Ingredients - Nutrition cooking</title>
      </Head>
      <SearchBar
        search={(e) => {
          console.log("search ingredient", e.target.value);
        }}
      />

      <Row gutter={8} className={styles.list} justify="center">
        {!(ingredients || error) ? (
          <SkeletonList elements={20} />
        ) : (
          <>
            <ElementsList list={ingredients.data} />
            <Button
              type="primary"
              className={styles.addBtn}
              icon={<FontAwesomeIcon icon={faPlus} />}
              shape="circle"
              onClick={() => {router.push('/ingredients/add')}}
            ></Button>
          </>
        )}
      </Row>
    </Layout>
  );
}
