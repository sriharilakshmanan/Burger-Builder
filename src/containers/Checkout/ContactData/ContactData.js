import React, { Component } from "react";
//import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as orderActions from "../../../store/actions/index";
import axios from "../../../axios-orders";
class ContactData extends Component {
  state = {
    formIsValid: false,
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Name"
        },
        value: "",
        validationRules: {
          required: true
        },
        isValid: false,
        visited: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validationRules: {
          required: true
        },
        isValid: false,
        visited: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: "",
        validationRules: {
          required: true,
          length: 6
        },
        isValid: false,
        visited: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validationRules: {
          required: true
        },
        isValid: false,
        visited: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email ID"
        },
        value: "",
        validationRules: {
          required: true
        },
        isValid: false,
        visited: false
      },
      deliveryMode: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        validationRules: {},
        isValid: true
      }
    }
  };

  placeOrderHandler = (event) => {
    // Prevent Page Reload
    event.preventDefault();
    const formData = {};
    for (let formElement in this.state.orderForm) {
      formData[formElement] = this.state.orderForm[formElement].value;
    }

    const orderData = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice.toFixed(2),
      customer: formData
    };
    console.log("[Contact Data] props:", this.props);
    this.props.onPurchaseBurger(orderData, { ...this.props });
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.length) {
      isValid = +value.length === +rules.length && isValid;
    }

    return isValid;
  }

  onInputChangeHandler = (event, inputIdentifier) => {
    //cloning the state object
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    // spread operator only creates a shallow clone, hence to access "value", deep cloning the formElement
    const updatedFormElement = {
      ...this.state.orderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.isValid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validationRules
    );
    updatedFormElement.visited = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let formElement in updatedOrderForm) {
      formIsValid = formIsValid && updatedOrderForm[formElement].isValid;
    }
    console.log(formIsValid);
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };
  render() {
    let formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push({ id: key, config: this.state.orderForm[key] });
    }

    let form = (
      <form onSubmit={this.placeOrderHandler}>
        {formElements.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            isValid={formElement.config.isValid}
            shouldValidate={formElement.config.validationRules}
            visited={formElement.config.visited}
            onChange={(event) =>
              this.onInputChangeHandler(event, formElement.id)
            }
          />
        ))}
        {/* <Button btnType="Success">ORDER</Button> */}
        <button className="btn-info btn-sm" disabled={!this.state.formIsValid}>
          ORDER
        </button>
      </form>
    );
    if (this.props.loadSpinner) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h3>Delivery Address</h3>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loadSpinner: state.order.loadSpinner
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseBurger: (orderData, contactDataProps) =>
      dispatch(orderActions.purchaseBurger(orderData, contactDataProps))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
