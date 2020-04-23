import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Salad", type: "salad" }
];

const BuildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: $<strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((control) => (
      <BuildControl
        key={control.label}
        label={control.label}
        addIngredient={() => props.addIngredient(control.type)}
        removeIngredient={() => props.removeIngredient(control.type)}
        shouldDisable={props.shouldDisable[control.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.canPlaceOrder}
      onClick={props.purchaseHandler}
    >
      Order <i className="fas fa-check-circle"></i>
    </button>
  </div>
);

export default BuildControls;
