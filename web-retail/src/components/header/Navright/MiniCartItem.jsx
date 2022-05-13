import React from "react";
import classes from "./MiniCartItem.module.css";
import Context from "../../context/Context";
class MiniCartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { amount: 1 };
    this.getIndex = this.getIndex.bind(this);
  }
  getIndex(e) {
    if (
      e.target.getAttribute("id") === "addDiv" ||
      e.target.getAttribute("id") === "add"
    ) {
      this.setState({ amount: this.state.amount + 1 });
    }
    if (
      e.target.getAttribute("id") === "minusDiv" ||
      e.target.getAttribute("id") === "minus"
    ) {
      this.setState({ amount: this.state.amount - 1 });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.amount === 0) {
      this.setState({ amount: 1 });
    }
  }

  render() {
    return (
      <div className={classes.cartItem}>
        <div className={classes.left}>
          <h5 className={classes.brand}>{this.props.brand}</h5>
          <h4 className={classes.type}>{this.props.id}</h4>
          {this.props.prices.map((price, index) => {
            if (price.currency.symbol === this.context.currency) {
              return (
                <span key={Math.random() * index} className={classes.price}>{`${
                  price.currency.symbol
                } ${(price.amount * this.state.amount).toFixed(2)}`}</span>
              );
            }
          })}
          <div className={classes.sizes}>
            {this.props.attributes.map((item, index) => {
              let [key] = Object.keys(item);
              let [value] = Object.values(item);
              if (key === "Color") {
                return (
                  <div
                    style={{ backgroundColor: value }}
                    key={Math.random() * index}
                  >
                    {/* <span>{value}</span> */}
                  </div>
                );
              }
              return (
                <div key={Math.random() * index}>
                  <span>{value}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.right}>
          <div onClick={this.getIndex} className={classes.numbers}>
            <div id="addDiv" className={classes.sign}>
              <span id="add">+</span>
            </div>
            <div className={classes.amount}>
              <span>{`${this.state.amount}`}</span>
            </div>
            <div id="minusDiv" className={classes.sign}>
              <span id="minus">-</span>
            </div>
          </div>
          <div className={classes.image}>
            <img src={this.props.images[0]} alt="nature" />
          </div>
        </div>
      </div>
    );
  }
}
MiniCartItem.contextType = Context;
export default MiniCartItem;
