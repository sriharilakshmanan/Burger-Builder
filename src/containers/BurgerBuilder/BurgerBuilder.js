import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICE = {
  salad: 0.5,
  meat: 1.5,
  cheese: 0.8,
  bacon: 1.2
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    },
    totalPrice: 4,
    canPlaceOrder: false,
    hasOrdered: false
  };

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
    alert("Done");
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

    return (
      <Aux>
        <Modal
          showModal={this.state.hasOrdered}
          hideModal={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            continuePurchase={this.purchaseContinueHandler}
            cancelPurchase={this.purchaseCancelHandler}
            totalPrice={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          shouldDisable={shouldDisable}
          price={this.state.totalPrice}
          canPlaceOrder={this.state.canPlaceOrder}
          purchaseHandler={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
