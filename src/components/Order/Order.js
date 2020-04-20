import React from "react";
import classes from "./Order.module.css";

const Order = (props) => {
  const ingredients = [];
  for (let ingredientKey in props.ingredients) {
    ingredients.push({
      type: ingredientKey,
      value: props.ingredients[ingredientKey]
    });
  }
  const ingredientOutput = ingredients.map((igKey) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "8px",
          border: "1px solid black",
          padding: "5px"
        }}
        key={igKey.type}
      >
        {igKey.type} ({igKey.value})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD {props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
