import React from "react";
import Burger from "../../Burger/Burger";
//import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h2>We hope you enjoy it! xD</h2>
      <div style={{ width: "100%" }}>
        <Burger ingredients={props.ingredients} />
        {/* <Button onClick={props.checkoutCancel} btnType="Danger">
          CANCEL
        </Button>
        <Button onClick={props.checkoutContinue} btnType="Success">
          CONTINUE
        </Button> */}
        <button onClick={props.checkoutCancel} className="btn-danger btn-md">
          CANCEL
        </button>
        <button onClick={props.checkoutContinue} className="btn-success btn-md">
          CONTINUE
        </button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
