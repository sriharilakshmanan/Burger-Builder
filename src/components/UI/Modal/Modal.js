import React from "react";
import classes from "./Modal.module.css";
import Auxiliary from "../../../hoc/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";
const Modal = (props) => {
  const styles = [classes.Modal];

  props.showModal
    ? styles.push(classes.ShowModal)
    : styles.push(classes.HideModal);
  return (
    <Auxiliary>
      <Backdrop showBackdrop={props.showModal} hideBackdrop={props.hideModal} />
      <div className={styles.join(" ")}>{props.children}</div>
    </Auxiliary>
  );
};

export default Modal;
