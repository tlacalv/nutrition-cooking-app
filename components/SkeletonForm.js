import { Col, Card, Skeleton, Row } from "antd";
import styles from "../styles/ingredients.module.css";

export default function SkeletonList(props) {
  return (
    <>
      <Skeleton.Input active className={styles.skeleton} />
      <Row gutter={16}>
        <Col span={12}>
          <Skeleton.Input active className={styles.skeleton} />
        </Col>
        <Col span={12}>
          <Skeleton.Input active className={styles.skeleton} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Skeleton.Input active className={styles.skeleton} />
        </Col>
        <Col span={12}>
          <Skeleton.Input active className={styles.skeleton} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Skeleton.Input active className={styles.skeleton} />
        </Col>
        <Col span={12}></Col>
      </Row>
    </>
  );
}
