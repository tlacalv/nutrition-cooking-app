import {Col, Card, Row,} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { gold } from "@ant-design/colors";
import styles from "../styles/list.module.css";


export default function ElementsList(props) {
  return (
    <>
      {props.list.map((item) => (
        <Col>
          <Card
            key={item._id}
            title={item.name}
            headStyle={{ background: gold[3] }}
            bodyStyle={{ padding: 0 }}
            style={{ minWidth: 300 }}
            actions={[
              <FontAwesomeIcon
                style={{ width: "100%" }}
                icon={faEdit}
              />,
              <FontAwesomeIcon style={{ width: "100%" }} icon={faTrash} />,
            ]}
          >
            <Row>
              <Col flex="auto">
                <table className={styles.table}>
                  <tr>
                    <td>Calories</td>
                    <td>{item.calories}</td>
                  </tr>
                  <tr>
                    <td>Carbohydrate</td>
                    <td>{item.carbohydrate}</td>
                  </tr>
                  <tr>
                    <td>Fat</td>
                    <td>{item.fat}</td>
                  </tr>
                  <tr>
                    <td>Protein</td>
                    <td>{item.protein}</td>
                  </tr>
                </table>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </>
  );
}
