import React, { Component, Suspense } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as authActions from "./store/actions";
import { connect } from "react-redux";
import Spinner from "./components/UI/Spinner/Spinner";

const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));

class App extends Component {
  componentDidMount() {
    this.props.tryAutoLogIn();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route
            path="/checkout"
            render={(props) => (
              <Suspense fallback={<Spinner />}>
                <Checkout {...props} />
              </Suspense>
            )}
          />
          <Route
            path="/orders"
            render={(props) => (
              <Suspense fallback={<Spinner />}>
                <Orders {...props} />
              </Suspense>
            )}
          />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {/* using Switch to avoid loading both the components on hitting "/checkout" because "/" can prefix anything  */}
          {/* Switch loads only the first component satisfying the route, and also using exact would solve the issue */}
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tryAutoLogIn: () => dispatch(authActions.checkAuthState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
