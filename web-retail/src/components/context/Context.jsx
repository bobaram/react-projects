import React from "react";

const Context = React.createContext();
class ContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.getCartObject = this.getCartObject.bind(this);
    this.getCurrency = this.getCurrency.bind(this);
    this.getCartBool = this.getCartBool.bind(this);
    this.getCurrBool = this.getCurrBool.bind(this);
    this.getModal = this.getModal.bind(this);
    this.clearCart = this.clearCart.bind(this);
    this.state = {
      currency: "$",
      cartObject: JSON.parse(window.sessionStorage.getItem("cartObject")) || [],
      currBool: false,
      cartBool: false,
      showModal: false,
      cartTotal: 0,
    };
  }

  clearCart() {
    this.setState({ cartObject: [] });
  }
  getModal(bool) {
    this.setState({ showModal: bool });
  }

  getCurrBool(bool) {
    this.setState({ currBool: bool });
  }
  getCartBool(bool) {
    this.setState({ cartBool: bool });
  }

  getCurrency(curr) {
    this.setState({ currency: curr });
  }
  getCartObject(object) {
    this.setState({ cartObject: [...this.state.cartObject, object] });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.cartObject !== this.state.cartObject) {
      window.sessionStorage.setItem(
        "cartObject",
        JSON.stringify(this.state.cartObject)
      );
      let sum = 0;
      for (let obj of this.state.cartObject) {
        for (let price of obj.prices) {
          if (price.currency.symbol === this.state.currency) {
            sum += price.amount;
            break;
          }
        }
      }
      this.setState({ cartTotal: sum });
    }
    if (prevState.currency !== this.state.currency) {
      let sum = 0;
      for (let obj of this.state.cartObject) {
        for (let price of obj.prices) {
          if (price.currency.symbol === this.state.currency) {
            sum += price.amount;
            break;
          }
        }
      }
      this.setState({ cartTotal: sum });
    }
  }
  render() {
    const currency = this.state.currency;
    const cartObject = this.state.cartObject;
    const getCartObject = this.getCartObject;
    const getCurrency = this.getCurrency;
    const getCurrBool = this.getCurrBool;
    const getCartBool = this.getCartBool;
    const cartBool = this.state.cartBool;
    const currBool = this.state.currBool;
    const showModal = this.state.showModal;
    const getModal = this.getModal;
    const clearCart = this.clearCart;
    const cartTotal = this.state.cartTotal;
    return (
      <Context.Provider
        value={{
          cartTotal,
          clearCart,
          showModal,
          getModal,
          currency,
          cartObject,
          getCurrency,
          getCartObject,
          cartBool,
          currBool,
          getCartBool,
          getCurrBool,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
export { ContextProvider };
