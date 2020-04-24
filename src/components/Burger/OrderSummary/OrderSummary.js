import React, { Component } from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (type) => {
        return (
          <li key={type}>
            <span style={{ textTransform: "capitalize" }}>{type}</span>:{" "}
            {this.props.ingredients[type]}
          </li>
        );
      }
    );
    return (
      <Auxiliary>
        <h3>Order Summary</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: ${this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Proceed to Checkout?</p>
        <Button btnType="Danger" onClick={this.props.cancelPurchase}>
          CANCEL
        </Button>
        <Button btnType="Success" onClick={this.props.continuePurchase}>
          CONTINUE
        </Button>
      </Auxiliary>
    );
  }
}

export default OrderSummary;
