import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" isActive>
      Burger Builder
    </NavigationItem>
    <NavigationItem>Checkout</NavigationItem>
  </ul>
);

export default NavigationItems;
