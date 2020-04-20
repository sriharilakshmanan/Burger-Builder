import React, { Component } from "react";
//import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      zipCode: "",
      country: ""
    },
    loadSpinner: false
  };

  placeOrderHandler = (event) => {
    event.preventDefault();
    this.setState({ loadSpinner: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: "Max",
        address: {
          street: "test-street",
          zipCode: "456127",
          country: "Germany"
        },
        email: "test@test.com"
      },
      deliveryMode: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        console.log(response);
        this.setState({ loadSpinner: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loadSpinner: false });
      });
  };

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Name" />
        <input type="emai" name="emai" placeholder="Email ID" />
        <input type="text" name="street" placeholder="Street Name" />
        <input type="text" name="zipcode" placeholder="Zipcode" />
        {/* <Button btnType="Success">ORDER</Button> */}
        <button className="btn-info btn-sm" onClick={this.placeOrderHandler}>
          ORDER
        </button>
      </form>
    );
    if (this.state.loadSpinner) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
