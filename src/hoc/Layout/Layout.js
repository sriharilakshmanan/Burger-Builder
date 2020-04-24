import React, { Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";
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
      <Auxiliary>
        <Toolbar
          showSideDrawer={this.sideDrawerShowHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <SideDrawer
          closeSideDrawer={this.sideDrawerCloseHandler}
          showSideDrawer={this.state.showSideDrawer}
          isAuthenticated={this.props.isAuthenticated}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
