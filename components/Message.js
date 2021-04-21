import React, { useState } from "react";
import ReactDOM from "react-dom";
import { classList } from "../functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function Message(props) {
  const [show, setShow] = useState(true);
  const icon = props.success? faCheckCircle : props.danger? faExclamationCircle : null
  const classes = classList({
    message: true,
    "message-danger": props.danger,
    "message-success": props.success,
  });
  if (show) {
    setTimeout(() => {
      setShow(false)
    }, 4000);
  }
  if (!show) return null;
  return ReactDOM.createPortal(
    <div className={classes}>
      <p><FontAwesomeIcon icon={icon} /> {props.children}</p>
    </div>,
    document.body
  );
}
