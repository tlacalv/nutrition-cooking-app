import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import styles from "../styles/sass/about.module.scss";

export default function about() {
  return (
    <Layout className={styles.about_bg} title="About">
      <Head>
        <title>About - Nutrition cooking</title>
      </Head>
      <section className={styles.content}>
        <p className="rg-16">
          This app is a personal project, intended to help organize and count
          calories and nutrition information in recipes.
        </p>
        <p className="rg-16">
          You can add ingredients and make recipes, and the app calculates all
          the nutrition information of each recipe based on the portion you
          provide, It’s useful when you cook a lot and want to keep track of
          calories and macros without dying on the try.
        </p>
        <p className="rg-16">
          I cook almost all my meals and I also track the caloric content of each
          one of my recipes, is a tedious process and very verbose, I made this
          app to help me keep storage of all my meals and make it easy to change
          little things and get all the information of the nutrients very easy.
        </p>
        <p className="rg-16">
          This app was made for me from the back end all the way to the front
          end, Implementing a custom solution for authentication as well as no
          UI framework, all with the stack MERN.
        </p>
        <p className="md-16">Made by Tlacaelel</p>
      </section>
    </Layout>
  );
}
