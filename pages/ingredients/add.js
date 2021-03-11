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
import { useState } from "react";

const { Title, Text } = Typography;
const positiveNumberVal = () => ({
  validator(_, value) {
    if (value >= 0 || !value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Enter positive numbers"));
  },
});
const nonZero = () => ({
  validator(_, value) {
    if (value !== 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Portion can't be 0"));
  },
});
export default function add() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  function onFinish() {
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
                nonZero
              ]}
            >
              <InputNumber className={styles.int_input} placeholder="gr" />
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
            <Form.Item name="fat" rules={[positiveNumberVal]}>
              <InputNumber className={styles.int_input} placeholder="Fat" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="carbohydrates" rules={[positiveNumberVal]}>
              <InputNumber
                className={styles.int_input}
                placeholder="Carbohydrates"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="protein" rules={[positiveNumberVal]}>
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
