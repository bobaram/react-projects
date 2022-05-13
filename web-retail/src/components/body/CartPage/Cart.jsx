import React from "react";
import Context from "../../context/Context";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
class Cart extends React.Component {
  render() {
    if (this.context.cartObject.length === 0) {
      return (
        <div className={classes.cart}>
          <h1>Cart</h1>
          <h2>Cart Is Empty</h2>
        </div>
      );
    }

    return (
      <div className={classes.cart}>
        <h1>Cart</h1>
        {this.context.cartObject.map((item, index) => {
          return (
            <CartItem
              key={Math.random() * index}
              id={item.id}
              brand={item.brand}
              prices={item.prices}
              images={item.gallery}
              attributes={item.attributes}
            />
          );
        })}
        <button onClick={this.context.clearCart} className={classes.clear}>
          Clear Cart
        </button>
      </div>
    );
  }
}
Cart.contextType = Context;
export default Cart;
