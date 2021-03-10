import Layout from "../../components/Layout";
import Head from "next/head";
import { useAuth } from "../../contexts/AuthContext";
import SearchBar from "../../components/SearchBar";
import useSWR from "swr";
import { Row } from "antd";
import styles from "../../styles/list.module.css";
import ElementsList from '../../components/ElementsList'
import SkeletonList from '../../components/SkeletonList'
import {useSession} from '../../utils/auth'




export default function Ingredients() {
  const { currentUser, JWT } = useAuth();
  const { data: ingredients, error } = useSWR(
    !currentUser ? false : ["ingredients", JWT]
  );
  if (error) {
    console.log('ñoco',error)
    Promise.resolve(useSession())
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
        {!(ingredients || error) ? (
          <SkeletonList elements={20} />
        ) : (
          <ElementsList list={ingredients.data} />
        )}
      </Row>
    </Layout>
  );
}
