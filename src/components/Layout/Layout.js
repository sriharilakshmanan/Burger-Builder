import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

//Layout is the Root component of the application. It is a wrapper component.
class Layout extends Component {
  state = {
    showSideDrawer: false
  };
  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerShowHandler = () => {
    this.setState({ showSideDrawer: true });
  };
  render() {
    return (
      <Aux>
        <Toolbar showSideDrawer={this.sideDrawerShowHandler} />
        <SideDrawer
          closeSideDrawer={this.sideDrawerCloseHandler}
          showSideDrawer={this.state.showSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
