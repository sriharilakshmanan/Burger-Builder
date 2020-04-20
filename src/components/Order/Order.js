import React from "react";
import classes from "./Order.module.css";

const Order = (props) => {
  const ingredientColors = {
    bacon: "#ebc6c6",
    cheese: "#ffe699",
    meat: "#e6b3b3",
    salad: "#c6ffb3"
  };
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
          borderRadius: "5px",
          padding: "5px",
          backgroundColor: ingredientColors[igKey.type],
          color: "black"
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
