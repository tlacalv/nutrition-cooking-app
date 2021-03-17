import ViewLayout from "../../components/ViewLayout";
import Head from "next/head";
import { Form, Row, Col, Input, Button, Space, Alert, InputNumber } from "antd";
import styles from "../../styles/viewlayout.module.css";
import Api from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import useSWR from 'swr';
import { nonZero, positiveNumberVal } from "../../utils/validation";
import debounce from 'lodash/debounce';

export default function add() {
  const router = useRouter();
  const searchRef = useRef();
  const { JWT } = useAuth();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const { data: ingredientsQueried, errorQuery } = useSWR(
    !query ? false : [`ingredients/search/?queryString=${query}`, JWT]
  );

  const [error, setError] = useState("");
  console.log(ingredientsQueried)
  function search() {
    setQuery(searchRef.current.input.value)
  }
  return (
    <ViewLayout title="Add" subTitle="Recipes">
      <Head>
        <title>Add Recipes - Nutrition cooking</title>
      </Head>
      <form>
        {error && <Alert message={error} type="error" showIcon />}
        <br></br>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Input placeholder="Name" />
          </Col>
          <Col span={24}>
            <Input
              type="search"
              size="small"
              ref={searchRef}
              onChange={debounce(search, 500)}
              placeholder="Search for ingredient"
            />
          </Col>
        </Row>
      </form>
    </ViewLayout>
  );
}
