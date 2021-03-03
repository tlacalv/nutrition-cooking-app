import Layout from "../../components/Layout";
import Head from "next/head";
import SearchBar from "../../components/SearchBar";

export default function Recipes() {
  return (
    <Layout>
      <Head>
        <title>Recipes - Nutrition cooking</title>
      </Head>
      <SearchBar />
      <div>Recipes</div>
    </Layout>
  );
}
