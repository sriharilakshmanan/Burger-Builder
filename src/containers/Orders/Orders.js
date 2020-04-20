import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component {
  state = {
    orders: [],
    loadSpinner: true,
    error: null
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((response) => {
        console.log(response.data);
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key
          });
        }
        this.setState({ loadSpinner: false, orders: fetchedOrders });
      })
      .catch((error) => {
        this.setState({ loadSpinner: false, error: true });
      });
  }
  render() {
    return (
      <div style={{ marginTop: "80px" }}>
        {this.state.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
