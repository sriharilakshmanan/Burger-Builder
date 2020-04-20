import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICE = {
  salad: 0.5,
  meat: 1.5,
  cheese: 0.8,
  bacon: 1.2
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    canPlaceOrder: false,
    hasOrdered: false,
    loadSpinner: false,
    error: null
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("https://burger-builder-ab66d.firebaseio.com/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        console.log(error);
        return this.setState({ error: true });
      });
  }

  canPlaceOrderHandler = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((type) => {
        return ingredients[type];
      })
      .reduce((sum, element) => {
        return sum + element;
      }, 0);
    this.setState({ canPlaceOrder: sum > 0 });
  };

  purchaseHandler = () => {
    this.setState({ hasOrdered: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ hasOrdered: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let igKey in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(igKey) +
          "=" +
          encodeURIComponent(this.state.ingredients[igKey])
      );
    }
    queryParams.push("totalPrice=" + this.state.totalPrice);
    let queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };
  addIngredientHandler = (type) => {
    const prevCount = this.state.ingredients[type];
    const nextCount = prevCount + 1;

    const nextIngredients = { ...this.state.ingredients };

    nextIngredients[type] = nextCount;

    const prevPrice = this.state.totalPrice;
    const nextPrice = prevPrice + INGREDIENT_PRICE[type];

    this.setState({ ingredients: nextIngredients, totalPrice: nextPrice });
    this.canPlaceOrderHandler(nextIngredients);
  };

  removeIngredientHandler = (type) => {
    const prevCount = this.state.ingredients[type];
    const nextCount = prevCount - 1;

    const nextIngredients = { ...this.state.ingredients };

    nextIngredients[type] = nextCount;

    const prevPrice = this.state.totalPrice;
    const nextPrice = prevPrice - INGREDIENT_PRICE[type];

    this.setState({ ingredients: nextIngredients, totalPrice: nextPrice });
    this.canPlaceOrderHandler(nextIngredients);
  };

  render() {
    let shouldDisable = {
      ...this.state.ingredients
    };
    //setting shouldDisable Minus Button for every ingredient type.
    for (let key in shouldDisable) {
      shouldDisable[key] = shouldDisable[key] <= 0;
    }

    let burger = this.state.error ? (
      <h2 style={{ textAlign: "center" }}>Oops! Failed to load ingredients.</h2>
    ) : (
      <Spinner />
    );
    let orderSummary = null;
    if (this.state.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            shouldDisable={shouldDisable}
            price={this.state.totalPrice}
            canPlaceOrder={this.state.canPlaceOrder}
            purchaseHandler={this.purchaseHandler}
          />
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          continuePurchase={this.purchaseContinueHandler}
          cancelPurchase={this.purchaseCancelHandler}
          totalPrice={this.state.totalPrice}
        />
      );
    }

    if (this.state.loadSpinner) {
      orderSummary = <Spinner />;
    }

    return (
      <Auxiliary>
        <Modal
          showModal={this.state.hasOrdered}
          hideModal={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
