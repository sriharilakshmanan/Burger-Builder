import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

const NavigationItem = (props) => (
  <li className={classes.NavigationItem}>
    {/* Navlink automatically adds active class to the active link but css modules adds a hash to our .active class and hence we'll have to specify it*/}
    {/* Adding exact so that only the exactly matched link is active, else all links with a common prefix will be active */}
    <NavLink exact to={props.link} activeClassName={classes.active}>
      {props.children}
    </NavLink>
  </li>
);

export default NavigationItem;
