import { Col, Card, Row, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { gold } from "@ant-design/colors";
import styles from "../styles/list.module.css";
const { Title } = Typography;

export default function IngredientCard(props) {
  const { ingredient } = props;
  function onDelete(e) {
    console.log(e);
  }
  function onEdit() {}
  return (
    <>
      <Col>
        <Card
          title={<Title level={4}>{ingredient.name}</Title>}
          headStyle={{ background: gold[3] }}
          bodyStyle={{ padding: 0 }}
          style={{ minWidth: 300 }}
          actions={[
            <FontAwesomeIcon
              style={{ width: "100%" }}
              onClick={onEdit}
              icon={faEdit}
            />,
            <FontAwesomeIcon
              style={{ width: "100%" }}
              onClick={onDelete}
              icon={faTrash}
            />,
          ]}
        >
          <Row>
            <Col flex="auto">
              <table className={styles.table}>
                <tbody>
                  <tr>
                    <td>Calories</td>
                    <td>{ingredient.calories}</td>
                  </tr>
                  <tr>
                    <td>Carbohydrate</td>
                    <td>{ingredient.carbohydrate}</td>
                  </tr>
                  <tr>
                    <td>Fat</td>
                    <td>{ingredient.fat}</td>
                  </tr>
                  <tr>
                    <td>Protein</td>
                    <td>{ingredient.protein}</td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  );
}
