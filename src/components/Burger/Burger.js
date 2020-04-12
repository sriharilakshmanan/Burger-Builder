import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
  //Object.keys() retuns an array of the object's keys(i.e ingredientType here)

  let ingredientsList = Object.keys(props.ingredients)
    //First .map() function returns an Array of elements for every ingredient type
    //In the first .map() function, an array is created with the number of elements retrieved by passing the ingredients[ingredientType]
    .map((type) => {
      return (
        [...Array(props.ingredients[type])]
          //Second .map() function returns the list of jsx elements for every ingredientType
          .map((_, index) => {
            return (
              <BurgerIngredient
                key={type + index}
                ingredientType={type}
              />
            );
          })
      );
    })
    //Reduces the Nested Array into a single array. The second argument to reduce is the initial value of the reduced element.
    .reduce((array, element) => {
      return array.concat(element);
    }, []);

  if (ingredientsList.length === 0) {
    ingredientsList = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient ingredientType="bread-top" />
      {ingredientsList}
      <BurgerIngredient ingredientType="bread-bottom" />
    </div>
  );
};

export default Burger;
