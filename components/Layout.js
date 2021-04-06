import Head from "next/head";
import MenuDrawer from "../components/MenuDrawer";
import styles from "../styles/layout.module.css";
import React, { useEffect } from "react";
import SearchBar from "./SearchBar";
import MenuButton from "./MenuButton";
import { useUI } from "../contexts/UIContext";

export default function Layout({ children }) {
  const { setShowMenu } = useUI();

  const SearchComponent = children.find?.((child) => child.type === SearchBar);
  const newChildren = children.filter?.((child) => child.type !== SearchBar);
  useEffect(() => {
    setShowMenu(false);
  }, []);
  return (
    <div className="layout">
      <Head>
        <meta
          name="description"
          content="Store your ingredients and recipes nutrition values so you can stop worring about them"
        />
      </Head>
      <MenuDrawer />
      <div className={styles.site_layout}>
        <header>{SearchComponent ? SearchComponent : <MenuButton />}</header>
        <div
          style={{
            margin: "24px 16px",
            minHeight: "100vh",
          }}
        >
          {newChildren}
        </div>
      </div>
    </div>
  );
}
