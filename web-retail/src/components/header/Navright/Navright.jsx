import React from "react";
import classes from "./Navright.module.css";
import ReactDOM from "react-dom";
import { FaDollarSign } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { GoArrowSmallDown } from "react-icons/go";
import { GoArrowSmallUp } from "react-icons/go";
import { FaPoundSign } from "react-icons/fa";
import { FaRubleSign } from "react-icons/fa";

import { FaYenSign } from "react-icons/fa";
import MiniCartItem from "./MiniCartItem";
import { Link } from "react-router-dom";
import Context from "../../context/Context";
class Navright extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currency: "$", dropDown: false, showCart: false, total: 0 };
    this.handleCurrency = this.handleCurrency.bind(this);
    this.handleCart = this.handleCart.bind(this);
    this.closeDropDowns = this.closeDropDowns.bind(this);
  }

  closeDropDowns(e) {
    if (e.target.getAttribute("id") === "overlay") {
      this.setState({ showCart: false });
      this.setState({ dropDown: false });
    }
  }
  componentDidMount() {
    window.addEventListener("click", this.closeDropDowns);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currency != this.state.currency) {
      this.context.getCurrency(this.state.currency);
    }
    if (prevState.dropDown != this.state.dropDown) {
      this.context.getCurrBool(this.state.dropDown);
    }
    if (prevState.showCart != this.state.showCart) {
      this.context.getCartBool(this.state.showCart);
    }
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.closeDropDowns);
  }
  handleCurrency(e) {
    if (e.target.classList.contains(classes.dropbtn)) {
      this.setState({ dropDown: !this.state.dropDown });
    }

    if (e.target.classList.contains(classes.currency)) {
      let currencyVal = e.target.dataset.id;
      this.setState({ currency: currencyVal });
      this.setState({ dropDown: !this.state.dropDown });
    }
  }
  handleCart(e) {
    if (e.target.classList.contains(classes.cartIcon)) {
      this.setState({ showCart: !this.state.showCart });
    }
  }

  render() {
    return (
      <div className={classes.rightNav}>
        <div className={`${classes.item} ${classes.currency} `}>
          {this.state.currency === "$" && <FaDollarSign size="1.8em" />}
          {this.state.currency === "£" && <FaPoundSign size="1.8em" />}
          {this.state.currency === "¥" && <FaYenSign size="1.8em" />}
          {this.state.currency === "₽" && <FaRubleSign size="1.8em" />}
          {this.state.currency === "A$" && (
            <React.Fragment>
              <span className={classes.ausDollar}>A$ </span>
              {/* <FaDollarSign size="1.8em" /> */}
            </React.Fragment>
          )}

          <div onClick={this.handleCurrency} className={classes.dropdown}>
            {!this.state.dropDown && (
              <GoArrowSmallDown className={classes.dropbtn} size="1.8em" />
            )}
            {this.state.dropDown && (
              <GoArrowSmallUp className={classes.dropbtn} size="1.8em" />
            )}
            {ReactDOM.createPortal(
              <div
                className={`${classes.dropDownCont} ${
                  this.state.dropDown ? classes.show : ""
                }`}
              >
                <span className={classes.currency} data-id="$">
                  $ USD
                </span>
                <span className={classes.currency} data-id="£">
                  £ GBP
                </span>
                <span className={classes.currency} data-id="¥">
                  ¥ JPY
                </span>
                <span className={classes.currency} data-id="A$">
                  A$ AUD
                </span>
                <span className={classes.currency} data-id="₽">
                  ₽ RUB
                </span>
              </div>,
              document.getElementById("modal")
            )}
          </div>
        </div>
        <div className={`${classes.cartContainer} ${classes.item} `}>
          <BsCart3
            onClick={this.handleCart}
            className={classes.cartIcon}
            size="1.8em"
          />
          {this.context.cartObject.length !== 0 && (
            <span className={classes.cartNum}>
              {this.context.cartObject.length}
            </span>
          )}

          {ReactDOM.createPortal(
            <div
              className={`${classes.cartDropDown} ${
                this.state.showCart ? classes.show : " "
              }`}
            >
              <div className={classes.cartItems}>
                {this.context.cartObject ? (
                  this.context.cartObject.map((item, index) => {
                    return (
                      <MiniCartItem
                        key={Math.random() * index}
                        id={item.id}
                        brand={item.brand}
                        prices={item.prices}
                        images={item.gallery}
                        attributes={item.attributes}
                      />
                    );
                  })
                ) : (
                  <h1>No Items Available!</h1>
                )}
              </div>
              <div className={classes.total}>
                <span>Total</span>
                <span>{`${this.context.currency} ${this.context.cartTotal}`}</span>
              </div>
              <div className={classes.buttons}>
                <Link to="cart" role="button" className={classes.viewBag}>
                  View Bag
                </Link>
                <button className={classes.checkout}>Checkout</button>
              </div>
            </div>,
            document.getElementById("modal")
          )}
        </div>
      </div>
    );
  }
}

Navright.contextType = Context;
export default Navright;
