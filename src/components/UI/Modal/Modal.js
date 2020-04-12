import React from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Aux";
import Backdrop from "../Backdrop/Backdrop";
const Modal = (props) => {
  const styles = [classes.Modal];

  props.showModal
    ? styles.push(classes.ShowModal)
    : styles.push(classes.HideModal);
  return (
    <Aux>
      <Backdrop showBackdrop={props.showModal} hideBackdrop={props.hideModal} />
      <div className={styles.join(" ")}>{props.children}</div>
    </Aux>
  );
};

export default Modal;