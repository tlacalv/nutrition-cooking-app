import Layout from "../../components/Layout";
import Head from "next/head";
import SearchBar from "../../components/SearchBar";

export default function Ingredients() {
  return (
    <Layout>
      <Head>
        <title>Ingredients - Nutrition cooking</title>
      </Head>
      <SearchBar search={(e) => {console.log('search ingredient', e.target.value)}} />
      <div>Ingredients</div>
    </Layout>
  );
}
