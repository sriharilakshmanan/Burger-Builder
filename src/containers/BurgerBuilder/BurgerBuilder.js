import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    hasOrdered: false,
    loadSpinner: false,
    error: null
  };

  componentDidMount() {
    console.log(this.props);
    // axios
    //   .get("https://burger-builder-ab66d.firebaseio.com/ingredients.json")
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     return this.setState({ error: true });
    //   });
  }

  canPlaceOrderHandler = () => {
    const sum = Object.keys(this.props.ingredients)
      .map((type) => {
        return this.props.ingredients[type];
      })
      .reduce((sum, element) => {
        return sum + element;
      }, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({ hasOrdered: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ hasOrdered: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    let shouldDisable = {
      ...this.props.ingredients
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
    if (this.props.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            //Passing the reference of the function as a property here and the actual execution takes place in BuildControls
            addIngredient={this.props.addIngredientHandler}
            removeIngredient={this.props.removeIngredientHandler}
            shouldDisable={shouldDisable}
            price={this.props.totalPrice}
            canPlaceOrder={this.canPlaceOrderHandler()}
            purchaseHandler={this.purchaseHandler}
          />
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          continuePurchase={this.purchaseContinueHandler}
          cancelPurchase={this.purchaseCancelHandler}
          totalPrice={this.props.totalPrice}
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

// mapStateToProps receives the state and passes it on to the component as props
const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

// mapDispatchToProps receives the dispatch function and passes it on to the component as individual props
const mapDispatchToProps = (dispatch) => {
  return {
    addIngredientHandler: (ingredientName) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName
      }),
    removeIngredientHandler: (ingredientName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
