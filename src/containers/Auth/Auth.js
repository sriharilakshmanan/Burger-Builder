import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";
import * as authActions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";

class Auth extends Component {
  state = {
    showMessage: true,
    isRegister: false,
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email ID"
        },
        value: "",
        validationRules: {
          required: true,
          isEmail: true
        },
        isValid: false,
        visited: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validationRules: {
          required: true,
          minLength: 6
        },
        isValid: false,
        visited: false
      }
    }
  };

  componentDidMount() {
    setTimeout(() => this.setState({ showMessage: false }), 4000);
  }
  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  authToggleHandler = () => {
    this.setState({
      ...this.state,
      isRegister: !this.state.isRegister
    });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isRegister
    );
  };

  onInputChangeHandler(event, controlId) {
    //cloning the state object
    const updatedControls = {
      ...this.state.controls,
      [controlId]: {
        ...this.state.controls[controlId],
        value: event.target.value,
        isValid: this.checkValidity(
          event.target.value,
          this.state.controls[controlId].validationRules
        ),
        visited: true
      }
    };
    this.setState({ controls: updatedControls });
  }

  render() {
    let formElements = [];
    for (let key in this.state.controls) {
      formElements.push({ id: key, config: this.state.controls[key] });
    }

    let form = formElements.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        isValid={formElement.config.isValid}
        shouldValidate={formElement.config.validationRules}
        visited={formElement.config.visited}
        onChange={(event) => this.onInputChangeHandler(event, formElement.id)}
      />
    ));

    if (this.props.loadSpinner) {
      form = <Spinner />;
    }

    let errorMessage = null;
    let message = (
      <div
        className={[
          "alert",
          "alert-primary",
          classes.elementToFadeInAndOut
        ].join(" ")}
        role="alert"
      >
        Please Register/Login to continue
      </div>
    );

    if (!this.state.showMessage) {
      message = null;
    }

    if (this.props.error) {
      errorMessage = (
        <div className="alert alert-danger" role="alert">
          {"OOPS! " + this.props.error.split("_").join(" ")}
        </div>
      );
    }
    let authRedirect = null;

    if (this.props.isAuthenticated && this.props.buildingBurger) {
      authRedirect = <Redirect to="/checkout" />;
    } else if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />;
    }

    return (
      <Auxiliary>
        <div className={classes.Auth}>
          {authRedirect}
          {errorMessage}
          <form onSubmit={this.onSubmitHandler}>
            {form}
            <button className="btn btn-success">
              {this.state.isRegister ? "REGISTER" : "LOGIN"}
            </button>
          </form>
          <button className="btn btn-dark" onClick={this.authToggleHandler}>
            SWITCH TO {this.state.isRegister ? "LOGIN" : "REGISTER"}
          </button>
        </div>
        {message}
      </Auxiliary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loadSpinner: state.auth.loadSpinner,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.buildingBurger
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isRegister) =>
      dispatch(authActions.auth(email, password, isRegister))
  };
};

// Passing NULL as the first argument is mandatory in case we don't have mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
