import React, { Component } from "react";
import classes from "./Modal.module.css";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  //Updates or Triggers a re render of the Order Summary component only if the state of showModal changes.
  ///Updates or Triggers a re render of the Modal also if the child component changes(Spinner instead of the OrderSummary)
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.showModal !== this.props.showModal ||
      nextProps.children !== this.props.children
    );
  }
  render() {
    const styles = [classes.Modal];

    this.props.showModal
      ? styles.push(classes.ShowModal)
      : styles.push(classes.HideModal);
    return (
      <Auxiliary>
        <Backdrop
          showBackdrop={this.props.showModal}
          hideBackdrop={this.props.hideModal}
        />
        <div className={styles.join(" ")}>{this.props.children}</div>
      </Auxiliary>
    );
  }
}

export default Modal;
