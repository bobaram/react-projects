import React from "react";
import classes from "./CartItem.module.css";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Context from "../../context/Context";
class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { amount: 1, imgIndex: 0 };
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
    if (e.target.getAttribute("id") === "next") {
      this.setState({ imgIndex: this.state.imgIndex + 1 });
      console.log("i do");
    }
    if (e.target.getAttribute("id") === "prev") {
      this.setState({ imgIndex: this.state.imgIndex - 1 });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.amount === 0) {
      this.setState({ amount: 1 });
    }
    if (this.state.imgIndex === this.props.images.length) {
      this.setState({ imgIndex: 0 });
    }

    if (this.state.imgIndex < 0) {
      this.setState({ imgIndex: 0 });
    }
  }

  render() {
    return (
      <div className={classes.items}>
        <div className={classes.left}>
          <h2 className={classes.brand}>{this.props.brand}</h2>
          <h2 className={classes.type}>{this.props.id}</h2>
          {this.props.prices.map((price, index) => {
            if (price.currency.symbol === this.context.currency) {
              return (
                <span key={Math.random() * index} className={classes.price}>{`${
                  price.currency.symbol
                } ${price.amount * this.state.amount}`}</span>
              );
            }
          })}
        </div>
        <div className={classes.middle}>
          {this.props.attributes.map((item, index) => {
            let [key] = Object.keys(item);
            let [value] = Object.values(item);
            if (key === "Color") {
              return (
                <div key={Math.random() * index}>
                  <span className={classes.key}>{key}</span>
                  <span
                    style={{ backgroundColor: value }}
                    className={classes.value}
                  ></span>
                </div>
              );
            }
            return (
              <div key={Math.random() * index}>
                <span className={classes.key}>{key}</span>
                <span className={classes.value}>{value}</span>
              </div>
            );
          })}
        </div>

        <div onClick={this.getIndex} className={classes.right}>
          <div className={classes.numbers}>
            <div id="addDiv" className={classes.sign}>
              <span id="add">+</span>
            </div>
            <div className={classes.amount}>
              <span>{`${this.state.amount.toFixed(2)}`}</span>
            </div>
            <div id="minusDiv" className={classes.sign}>
              <span id="minus">-</span>
            </div>
          </div>
          <div className={classes.image}>
            <MdOutlineKeyboardArrowLeft
              id="prev"
              size="1.8em"
              className={classes.prev}
            />
            <img src={this.props.images[this.state.imgIndex]} alt="nature" />
            <MdOutlineKeyboardArrowRight
              id="next"
              size="1.8em"
              className={classes.next}
            />
          </div>
        </div>
      </div>
    );
  }
}
CartItem.contextType = Context;
export default CartItem;
