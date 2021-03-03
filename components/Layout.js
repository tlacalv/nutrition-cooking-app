import Head from "next/head";
import MenuDrawer from "../components/MenuDrawer";
import { Layout as Antlayout } from "antd";
import styles from "../styles/layout.module.css";
import React, { useEffect } from "react";
import SearchBar from "./SearchBar";
import MenuButton from "./MenuButton";
import { useUI } from "../contexts/UIContext";

const { Header, Content } = Antlayout;

export default function Layout({ children }) {
  const { setShowMenu } = useUI();

  const SearchComponent = children.find?.((child) => child.type === SearchBar);
  const newChildren = children.filter?.((child) => child.type !== SearchBar);
  useEffect(() => {
    setShowMenu(false);
  }, []);
  return (
    <Antlayout>
      <Head>
        <meta
          name="description"
          content="Store your ingredients and recipes nutrition values so you can stop worring about them"
        />
      </Head>
      <MenuDrawer />
      <Antlayout className={styles.site_layout}>
        <Header
          className={styles.site_layout_background}
          style={{ padding: "0 1rem" }}
        >
          {SearchComponent ? SearchComponent : <MenuButton />}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            minHeight: "100vh",
          }}
        >
          {newChildren}
        </Content>
      </Antlayout>
    </Antlayout>
  );
}
