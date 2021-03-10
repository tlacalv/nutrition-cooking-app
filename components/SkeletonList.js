import { Col, Card, Skeleton, Row } from "antd";
import styles from "../styles/list.module.css";

export default function SkeletonList(props) {
  return (
    <>
      {Array(props.elements)
        .fill()
        .map((item, index) => {
          return (
            <Col key={index}>
              <Card
                title={<Skeleton.Input style={{ width: 100 }} active />}
                style={{ width: 300 }}
                bodyStyle={{ padding: 10 }}
                actions={[
                  <Skeleton.Button active size="small" shape="round" />,
                  <Skeleton.Button active size="small" shape="round" />,
                ]}
              >
                <Row type="flex" justify="center">
                  <Col span={22}>
                    <Skeleton.Input
                      size="small"
                      active
                      className={styles.skeleton_row}
                    />
                  </Col>
                  <Col>
                    <Skeleton.Input
                      size="small"
                      active
                      className={styles.skeleton_row}
                    />
                  </Col>
                  <Col span={22}>
                    <Skeleton.Input
                      size="small"
                      active
                      className={styles.skeleton_row}
                    />
                  </Col>
                  <Col>
                    <Skeleton.Input
                      size="small"
                      active
                      className={styles.skeleton_row}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          );
        })}
    </>
  );
}
