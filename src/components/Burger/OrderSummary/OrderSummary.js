import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((type) => {
    return (
      <li key={type}>
        <span style={{ textTransform: "capitalize" }}>{type}</span>:{" "}
        {props.ingredients[type]}
      </li>
    );
  });

  return (
    <Auxiliary>
      <h3>Order Summary</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: ${props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Proceed to Checkout?</p>
      <Button btnType="Danger" onClick={props.cancelPurchase}>
        CANCEL
      </Button>
      <Button btnType="Success" onClick={props.continuePurchase}>
        CONTINUE
      </Button>
    </Auxiliary>
  );
};

export default OrderSummary;
