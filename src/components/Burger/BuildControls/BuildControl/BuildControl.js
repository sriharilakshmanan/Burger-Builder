import React from "react";
import classes from "./BuildControl.module.css";
const BuildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.removeIngredient}
      disabled={props.shouldDisable}
    >
      <i className="fas fa-minus-circle"></i>
    </button>
    <button className={classes.More} onClick={props.addIngredient}>
      <i className="fas fa-plus-circle"></i>
    </button>
  </div>
);

export default BuildControl;

/* <i class="fas fa-minus-circle"></i> */
/* <i class="fas fa-plus-circle"></i> */
