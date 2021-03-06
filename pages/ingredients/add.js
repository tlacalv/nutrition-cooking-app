import ViewLayout from "../../components/ViewLayout";
import Head from "next/head";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Alert,
  Typography,
  InputNumber,
} from "antd";
import styles from "../../styles/viewlayout.module.css";
import Api from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useRouter } from "next/router";
import { nonZero, positiveNumberVal } from '../../utils/validation';


const { Title, Text } = Typography;
export default function add() {
  const router = useRouter();
  const { JWT } = useAuth();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  async function onFinish({
    name,
    portion,
    calories: portionCal,
    fat: portionFat,
    carbohydrates: portionCarb,
    protein: portionProt,
  }) {
    setError("");
    setLoading(true);
    let postData = { name };
    const calories = (portionCal / portion) * 100;
    const fat = (portionFat / portion) * 100;
    const carbohydrate = (portionCarb / portion) * 100;
    const protein = (portionProt / portion) * 100;
    postData = { ...postData, calories, fat, carbohydrate, protein };
    try {
      const response = await Api.post("ingredients", postData, {
        Authorization: `Bearer ${JWT}`,
      });
      setLoading(false);
      router.push("/ingredients");
    } catch (error) {
      console.log(error)
      setError(error.message);
      setLoading(false);
    }
  }
  return (
    <ViewLayout title="Add" subTitle="Ingredients">
      <Head>
        <title>Add Ingredients - Nutrition cooking</title>
      </Head>
      <Form onFinish={onFinish}>
        {error && <Alert message={error} type="error" showIcon />}
        <br></br>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input a name",
            },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="portion"
              rules={[
                {
                  required: true,
                  message: "Portion size is needed",
                },
                positiveNumberVal,
                nonZero,
              ]}
            >
              <InputNumber
                className={styles.int_input}
                placeholder="Portion size in gr"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Calorie count is needed",
                },
                positiveNumberVal,
              ]}
              name="calories"
            >
              <InputNumber
                className={styles.int_input}
                placeholder="Calories"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="fat"
              rules={[
                {
                  required: true,
                  message: "Fat content is needed",
                },
                positiveNumberVal,
              ]}
            >
              <InputNumber className={styles.int_input} placeholder="Fat" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="carbohydrates"
              rules={[
                {
                  required: true,
                  message: "Carbohydrate content is needed",
                },
                positiveNumberVal,
              ]}
            >
              <InputNumber
                className={styles.int_input}
                placeholder="Carbohydrates"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="protein"
              rules={[
                {
                  required: true,
                  message: "Protein content is needed",
                },
                positiveNumberVal,
              ]}
            >
              <InputNumber className={styles.int_input} placeholder="Protein" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <div className="flex flex-hc">
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={loading}
            >
              Sign Up
            </Button>
          </div>
        </Form.Item>
      </Form>
    </ViewLayout>
  );
}
