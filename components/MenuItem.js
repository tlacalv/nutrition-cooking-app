import React from "react";
import Link from "next/link";
import styles from "../styles/sass/components/menu.module.scss";
import { classList } from "../functions/index";

export default function MenuItem(props) {
  const classes = classList({
    [styles.active]: props.active,
    [styles.menu_item]: true,
  });
  return (
    <li className={classes}>
      <Link href={props.link}>
        <a className="md-16">
          <>
            {props.icon} {props.name}
          </>
        </a>
      </Link>
    </li>
  );
}
