import { Layout as Antlayout, PageHeader } from "antd";
import styles from "../styles/viewlayout.module.css";

const { Content } = Antlayout;

export default function ViewLayout(props) {
  return (
    <Antlayout style={{ minHeight: "100vh" }}>
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        title={props.title}
        subTitle={props.subTitle}
      />
      <Antlayout>
        <Antlayout style={{ padding: "0 24px 24px" }}>
          <Content
            className={styles.site_layout_background}
            style={{
              padding: 24,
              margin: 'auto',
              minHeight: "100%",
              width: 700,
              maxWidth: '100%'
            }}
          >
            {props.children}
          </Content>
        </Antlayout>
      </Antlayout>
    </Antlayout>
  );
}
