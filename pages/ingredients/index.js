import Layout from "../../components/Layout";
import Head from "next/head";
import { useAuth } from "../../contexts/AuthContext";
import SearchBar from "../../components/SearchBar";
import useSWR from "swr";
import { Row } from "antd";
import styles from "../../styles/list.module.css";
import ElementsList from '../../components/ElementsList'
import SkeletonList from '../../components/SkeletonList'




export default function Ingredients() {
  const { currentUser, JWT } = useAuth();
  const { data: ingredients, error } = useSWR(
    !currentUser ? false : ["ingredients", JWT]
  );
  if (error) {
    console.log(error);
    return <div>Failed</div>;
  }
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

      <Row gutter={8} className={styles.list}>
        {!ingredients ? (
          <SkeletonList elements={20} />
        ) : (
          <ElementsList list={ingredients.data} />
        )}
      </Row>
    </Layout>
  );
}
