import ViewLayout from "../../components/ViewLayout";
import Head from "next/head";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Alert,
  InputNumber,
} from "antd";
import styles from "../../styles/viewlayout.module.css";
import Api from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useRouter } from "next/router";
import { nonZero, positiveNumberVal } from '../../utils/validation';


export default function add() {
  const router = useRouter();
  const { JWT } = useAuth();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
 
  return (
    <ViewLayout title="Add" subTitle="Recipes">
      <Head>
        <title>Add Recipes - Nutrition cooking</title>
      </Head>
      <form>
        {error && <Alert message={error} type="error" showIcon />}
        <br></br>
        
      </form>
    </ViewLayout>
  );
}
